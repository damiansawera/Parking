package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.carExceptions.ExistingRegistrationNumberException;
import project.parking.model.Car;
import project.parking.service.CarService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/car")
@CrossOrigin(origins = "http://localhost:4200")
public class CarController {
    CarService carService;

    @GetMapping("/all")
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findAll());
    }

    @GetMapping("/search")
    public ResponseEntity<Car> getCarByRegistrationNumber(@RequestParam String registrationNumber) {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarByRegistrationNumber(registrationNumber));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarById(id));
    }

    @PostMapping
    public ResponseEntity<Car> addNewCar(@RequestBody Car carBody) {
            return ResponseEntity.status(HttpStatus.CREATED).body(carService.addNewCar(carBody));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCarById(@PathVariable Long id, @RequestBody Car carBody) {
        return ResponseEntity.status(HttpStatus.OK).body(carService.updateCar(id, carBody));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Car> deleteCarById(@PathVariable Long id) {
        carService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
