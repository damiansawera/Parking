package project.parking.exceptions;

public class ParkingSpotAlreadyExistsException extends RuntimeException {

    public ParkingSpotAlreadyExistsException(String message) {
        super(message);
    }
}
