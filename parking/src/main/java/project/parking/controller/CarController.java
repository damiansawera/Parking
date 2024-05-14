package project.parking.controller;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.model.Car;
import project.parking.service.CarService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/car")
public class CarController {
    CarService carService;

    @GetMapping
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Car>> getCarById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(carService.findCarById(id));
    }
    @PostMapping
    public ResponseEntity<Car> addNewCar(@RequestBody Car carBody) {
        carService.addNewCar(carBody);
        return new ResponseEntity<>(HttpStatus.CREATED);
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
