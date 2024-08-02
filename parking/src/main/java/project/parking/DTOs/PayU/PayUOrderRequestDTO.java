package project.parking.DTOs.PayU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayUOrderRequestDTO {
    private int totalAmount;
}
