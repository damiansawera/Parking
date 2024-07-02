package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.BookingDTO;
import project.parking.service.BookingService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/booking")
@CrossOrigin(origins = "http://localhost:4200")
public class BookingController {
    BookingService bookingService;

    @GetMapping("/all")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getAllBookings());
    }

    @GetMapping("/{registrationNumber}")
    public ResponseEntity<BookingDTO> getActiveBooking(@PathVariable String registrationNumber) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getActiveBooking(registrationNumber));
    }

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestParam String registrationNumber, @RequestParam String parkingSpotNumber) {
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(registrationNumber, parkingSpotNumber));
    }

    @PutMapping("/{registrationNumber}/end")
    public ResponseEntity<BookingDTO> endBooking(@PathVariable String registrationNumber) throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.endBooking(registrationNumber));
    }

}
