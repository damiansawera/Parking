package project.parking.DTOs.PayU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayUAuthRequest {
    private String grant_type;
    private String client_id;
    private String client_secret;
}
