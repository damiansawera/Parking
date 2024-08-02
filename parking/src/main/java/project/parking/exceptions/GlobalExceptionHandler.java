package project.parking.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import project.parking.exceptions.authExceptions.AuthException;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.exceptions.carExceptions.CarException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotException;
import project.parking.exceptions.walletExceptions.WalletException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CarException.class)
    public ResponseEntity<String> handleCarException(CarException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ParkingSpotException.class)
    public ResponseEntity<String> handleParkingSpotException(ParkingSpotException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(BookingException.class)
    public ResponseEntity<String> handleBookingException(BookingException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AuthException.class)
    public ResponseEntity<String> handleAuthException(AuthException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(WalletException.class)
    public ResponseEntity<String> handleWalletException(WalletException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
