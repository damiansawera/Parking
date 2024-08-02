package project.parking.DTOs.PayU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayUOrderResponse {
    private String statusCode;
    private String orderId;
    private String extOrderId;
    private String redirectUri;
}