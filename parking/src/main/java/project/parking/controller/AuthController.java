package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.AuthResponseDTO;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserLoginDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.config.JwtGenerator;
import project.parking.service.AuthService;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> signUp(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userRegistrationDTO));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody UserLoginDTO userLoginDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(authService.loginUser(userLoginDTO));
    }

}
