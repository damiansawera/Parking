package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.parking.DTOs.UserDTO;
import project.parking.service.UserService;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserDTO> getUserInfo() {
        return ResponseEntity.status(HttpStatus.OK).body(userService.getUserInfo());
    }
}
