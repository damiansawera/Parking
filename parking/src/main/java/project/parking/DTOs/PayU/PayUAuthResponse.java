package project.parking.DTOs.PayU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PayUAuthResponse {
    private String access_token;
    private String token_type;
    private int expires_in;
    private String grant_type;
}
