package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.model.User;
import project.parking.service.UserService;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signUp(@RequestBody UserRegistrationDTO userRegistrationDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(userRegistrationDTO));
    }
}
