package project.parking.exceptions;

public class ParkingSpotNotOccupiedException extends RuntimeException {

    public ParkingSpotNotOccupiedException(String message) {
        super(message);
    }
}
