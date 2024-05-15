package project.parking.exceptions;

public class CarAlreadyParkedException extends RuntimeException {

    public CarAlreadyParkedException(String message) {
        super(message);
    }
}
