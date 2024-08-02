package project.parking.DTOs.PayU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayUOrderRequest {
    private String continueUrl;
    private String notifyUrl;
    private String customerIp;
    private String merchantPosId;
    private String description;
    private String additionalDescription;
    private String visibleDescription;
    private String currencyCode;
    private String extOrderId;
    private String totalAmount;
    private Buyer buyer;
    private List<Product> products;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Buyer {
        private String extCustomerId;
        private String email;
        private String phone;
        private String firstName;
        private String lastName;
        private String nin;
        private String language;
        private Delivery delivery;

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class Delivery {
            private String street;
            private String postalBox;
            private String postalCode;
            private String city;
            private String state;
            private String countryCode;
            private String name;
            private String recipientName;
            private String recipientEmail;
            private String recipientPhone;
        }
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Product {
        private String name;
        private String unitPrice;
        private String quantity;
    }
}
