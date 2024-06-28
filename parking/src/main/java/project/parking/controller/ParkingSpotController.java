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
@CrossOrigin(origins = "http://localhost:4200")
public class ParkingSpotController {
    ParkingSpotService parkingSpotService;

    @GetMapping
    public ResponseEntity<List<ParkingSpot>> findAllParkingSpots() {
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.findAllParkingSpots());
    }
    @GetMapping("/{id}")
    public ResponseEntity<ParkingSpot> findParkingSpotById(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.findParkingSpotById(id));
    }

    @PutMapping("/add/{parkingSpotNumber}")
    public ResponseEntity<ParkingSpot> parkCarByRegistrationNumber(@RequestParam String registrationNumber, @PathVariable String parkingSpotNumber) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.parkCar(registrationNumber, parkingSpotNumber));
    }

    @PostMapping
    public ResponseEntity<ParkingSpot> addNewParkingSpot(@RequestBody ParkingSpot parkingSpot) {
            return ResponseEntity.status(HttpStatus.CREATED).body(parkingSpotService.addNewParkingSpot(parkingSpot));
    }

    @PutMapping("/{parkingSpotNumber}")
    public ResponseEntity<ParkingSpot> removeCarFromParkingSpot(@PathVariable String parkingSpotNumber) {
            return ResponseEntity.status(HttpStatus.OK).body(parkingSpotService.removeCarFromParkingSpot(parkingSpotNumber));
        }
}
