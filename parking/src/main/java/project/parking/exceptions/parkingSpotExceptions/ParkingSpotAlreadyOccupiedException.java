package project.parking.exceptions;

public class ParkingSpotAlreadyOccupiedException extends RuntimeException {

    public ParkingSpotAlreadyOccupiedException(String message) {
        super(message);
    }
}
