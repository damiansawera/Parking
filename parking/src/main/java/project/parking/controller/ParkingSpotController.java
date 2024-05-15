package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.exceptions.carExceptions.CarException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotAlreadyExistsException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotNotOccupiedException;
import project.parking.model.ParkingSpot;
import project.parking.service.ParkingSpotService;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/parking-spot")
public class ParkingSpotController {
    ParkingSpotService parkingSpotService;

    @GetMapping
    public ResponseEntity<List<ParkingSpot>> findAllParkingSpots() {
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.findAllParkingSpots());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<ParkingSpot>> findParkingSpotById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.findParkingSpotById(id));
    }

    @PostMapping("/{parkingSpotNumber}")
    public ResponseEntity<?> parkCarByRegistrationNumber(@RequestParam String registrationNumber, @PathVariable String parkingSpotNumber) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.parkCar(registrationNumber, parkingSpotNumber));
        } catch (ParkingSpotException | CarException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping
    public ResponseEntity<?> addNewParkingSpot(@RequestBody ParkingSpot parkingSpot) {
        try {
            parkingSpotService.addNewParkingSpot(parkingSpot);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (ParkingSpotAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{parkingSpotNumber}")
    public ResponseEntity<?> removeCarFromParkingSpot(@PathVariable String parkingSpotNumber) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.removeCarFromParkingSpot(parkingSpotNumber));
        } catch (ParkingSpotNotOccupiedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
