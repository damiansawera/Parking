package project.parking.DTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.parking.model.Booking;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
        @NotNull
        private String vehicleModel;
        @NotNull
        private String vehicleMake;
        @NotNull
        private String color;
        @NotNull
        private int productionYear;
        @NotNull
        private String registrationNumber;
        private String parkingSpotNumber;
        private List<Booking> bookings;
    }
