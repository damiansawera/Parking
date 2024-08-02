package project.parking.DTOs;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.model.Wallet;

import java.awt.print.Book;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {
        private String username;
        private String fullName;
        private String email;
        private Date memberSince;
        private WalletDTO wallet;
    }
