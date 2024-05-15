package project.parking.exceptions;

public class ExistingRegistrationNumberException extends RuntimeException {

    public ExistingRegistrationNumberException(String message) {
        super(message);
    }
}
