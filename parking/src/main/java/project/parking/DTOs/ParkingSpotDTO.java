package project.parking.DTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParkingSpotDTO {
        @NotNull
        private String number;
        @NotNull
        private int floor;
        @NotNull
        private boolean taken;
        private String registrationNumber;
        private Date bookingStartDate;
}
