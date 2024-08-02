package project.parking.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import project.parking.DTOs.PayU.*;
import project.parking.DTOs.WalletDTO;

import java.security.MessageDigest;
import java.util.Base64;
import java.util.Collections;
import java.util.Random;

@Service
@Transactional
public class PayUService {
    @Value("${payu.clientId}")
    private String clientId;

    @Value("${payu.clientSecret}")
    private String clientSecret;

    @Value("${payu.oauthUrl}")
    private String oauthUrl;

    @Value("${payu.orderUrl}")
    private String orderUrl;

    @Value("${payu.second.key}")
    private String payuSecondKey;

    private static final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate;
    private final WalletService walletService;
    private final UserService userService;

    public PayUService(RestTemplate restTemplate, WalletService walletService, UserService userService) {
        this.restTemplate = restTemplate;
        this.walletService = walletService;
        this.userService = userService;
    }

    public PayUAuthResponse getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", "client_credentials");
        map.add("client_id", clientId);
        map.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        return restTemplate.postForObject(
                oauthUrl,
                request,
                PayUAuthResponse.class
        );
    }

    public PayUOrderResponse createOrder(PayUOrderRequestDTO orderRequestDTO) {
        String totalAmount = Integer.toString(orderRequestDTO.getTotalAmount() * 100);
        String accessToken = getAccessToken().getAccess_token();
        Random random = new Random();
        int randomNumber = random.nextInt(1000000);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        PayUOrderRequest orderRequest = new PayUOrderRequest();
        orderRequest.setContinueUrl("http://localhost:4200/my-account");
        orderRequest.setNotifyUrl("https://e220-2a02-a317-413f-2000-3c4b-6e91-67de-d8ba.ngrok-free.app/payu/notify");
        orderRequest.setCustomerIp("127.0.0.1");
        orderRequest.setMerchantPosId(clientId);
        orderRequest.setDescription("Order Description");
        orderRequest.setAdditionalDescription("Additional Order Description");
        orderRequest.setVisibleDescription("Visible Order Description");
        orderRequest.setCurrencyCode("PLN");
        orderRequest.setExtOrderId(Integer.toString(randomNumber));
        orderRequest.setTotalAmount(totalAmount);

        PayUOrderRequest.Buyer buyer = new PayUOrderRequest.Buyer();
        buyer.setExtCustomerId(String.valueOf(userService.getCurrentUser().getId()));
        buyer.setEmail("john.doe@example.com");
        buyer.setPhone("654111654");
        buyer.setFirstName("John");
        buyer.setLastName("Doe");
        buyer.setLanguage("en");

        PayUOrderRequest.Product product = new PayUOrderRequest.Product();
        product.setName("Total Purchase");
        product.setUnitPrice("100");
        product.setQuantity("1");

        orderRequest.setBuyer(buyer);
        orderRequest.setProducts(Collections.singletonList(product));

        HttpEntity<PayUOrderRequest> request = new HttpEntity<>(orderRequest, headers);

        ResponseEntity<PayUOrderResponse> response = restTemplate.postForEntity(
                orderUrl,
                request,
                PayUOrderResponse.class
        );

        return response.getBody();
    }

    public WalletDTO processNotification(String notificationBody, String openPayuSignature) throws Exception {
        if (!verifySignature(notificationBody, openPayuSignature)) {
            throw new SecurityException("Invalid signature");
        }

        PayUNotification notification = objectMapper.readValue(notificationBody, PayUNotification.class);
        return processNotificationByStatus(notification);
    }

    private boolean verifySignature(String notificationBody, String openPayuSignature) throws Exception {
        String[] signatureParts = openPayuSignature.split(";");
        String incomingSignature = "";
        String algorithm = "";

        for (String part : signatureParts) {
            String[] keyValue = part.split("=");
            if (keyValue[0].equals("signature")) {
                incomingSignature = keyValue[1];
            } else if (keyValue[0].equals("algorithm")) {
                algorithm = keyValue[1];
            }
        }

        String concatenated = notificationBody + payuSecondKey;
        String expectedSignature;

        if (algorithm.equalsIgnoreCase("MD5")) {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] digest = md.digest(concatenated.getBytes("UTF-8"));
            expectedSignature = Base64.getEncoder().encodeToString(digest);
        } else {
            throw new IllegalArgumentException("Unsupported algorithm: " + algorithm);
        }
        return true;
    }

    private WalletDTO processNotificationByStatus(PayUNotification notification) {
        String status = notification.getOrder().getStatus();

        if (status.equals("COMPLETED")) {
            return handleCompletedStatus(notification);
        }
        return null;
    }

    private WalletDTO handleCompletedStatus(PayUNotification notification) {
        PayUNotification.Order order = notification.getOrder();
        if (order == null) {
            throw new IllegalArgumentException("Order information is missing in the notification");
        }

        PayUNotification.Buyer buyer = order.getBuyer();
        if (buyer == null) {
            throw new IllegalArgumentException("Buyer information is missing in the order");
        }

        float totalAmount = Float.parseFloat(order.getTotalAmount()) / 100f;
        long userId = Long.parseLong(buyer.getExtCustomerId());

        return walletService.topUpWalletBalanceByUserId(totalAmount, userId);
    }
}
