package project.parking.exceptions.carExceptions;

public class CarException extends RuntimeException {

    public CarException(String message) {
        super(message);
    }

    public CarException(String message, Throwable cause) {
        super(message, cause);
    }
}
