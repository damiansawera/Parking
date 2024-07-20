package project.parking.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.parking.model.Car;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDTO {
    private String fullName;
    private String username;
    private String password;
    private String email;
}
