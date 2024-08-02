package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.PayU.PayUAuthResponse;
import project.parking.DTOs.PayU.PayUOrderRequestDTO;
import project.parking.DTOs.PayU.PayUOrderResponse;
import project.parking.DTOs.WalletDTO;
import project.parking.service.PayUService;

@RestController
@AllArgsConstructor
@RequestMapping("/payu")
@CrossOrigin(origins = "http://localhost:4200")
public class PayUController {

    private final PayUService payUService;

    @GetMapping("/token")
    public ResponseEntity<PayUAuthResponse> getToken() {
        return ResponseEntity.status(HttpStatus.OK).body(payUService.getAccessToken());
    }

    @PostMapping("/order")
    public ResponseEntity<PayUOrderResponse> createOrder(@RequestBody PayUOrderRequestDTO orderRequestDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(payUService.createOrder(orderRequestDTO));
    }

    @PostMapping("/notify")
    public ResponseEntity<WalletDTO> handlePayUNotification(
            @RequestBody String notificationBody,
            @RequestHeader("OpenPayu-Signature") String openPayuSignature) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(payUService.processNotification(notificationBody, openPayuSignature));
    }

}
