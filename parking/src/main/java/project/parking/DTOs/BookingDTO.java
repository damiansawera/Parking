package project.parking.DTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
        private int price;
        @NotNull
        private Date bookingStartDate;
        private Date bookingEndDate;
        @NotNull
        private String registrationNumber;
        @NotNull
        private String parkingSpotNumber;
        private boolean isPaid;
}
