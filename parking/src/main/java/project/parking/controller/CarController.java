package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.BookingDTO;
import project.parking.DTOs.CarDTO;
import project.parking.model.Car;
import project.parking.service.CarService;

import java.util.List;


@RestController
@AllArgsConstructor
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:4200")
public class CarController {
    CarService carService;

    @GetMapping("/all")
    public ResponseEntity<List<CarDTO>> getAllCars() {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<CarDTO> getCarByRegistrationNumber(@RequestParam String registrationNumber) {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarByRegistrationNumber(registrationNumber));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarById(id));
    }

    @PostMapping
    public ResponseEntity<CarDTO> addNewCar(@RequestBody CarDTO carDTO) {
            return ResponseEntity.status(HttpStatus.CREATED).body(carService.addNewCar(carDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> updateCarById(@PathVariable Long id, @RequestBody CarDTO carDTO) {
        return ResponseEntity.status(HttpStatus.OK).body(carService.updateCar(id, carDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCarById(@PathVariable Long id) {
        carService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/user")
    public ResponseEntity<List<CarDTO>> getUserCars(@AuthenticationPrincipal User user) {
        return ResponseEntity.status(HttpStatus.OK).body(carService.getAllCarsByUser(user));
    }
}
