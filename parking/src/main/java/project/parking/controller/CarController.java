package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.carExceptions.ExistingRegistrationNumberException;
import project.parking.model.Car;
import project.parking.service.CarService;

import java.lang.reflect.Array;
import java.util.List;

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
    public ResponseEntity<?> getCarByRegistrationNumber(@RequestParam String registrationNumber) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarByRegistrationNumber(registrationNumber));
        } catch (CarNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCarById(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(carService.findCarById(id));
        } catch (CarNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
    @PostMapping
    public ResponseEntity<?> addNewCar(@RequestBody Car carBody) {
        try {
            carService.addNewCar(carBody);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ExistingRegistrationNumberException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
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
