package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.exceptions.carExceptions.CarAlreadyParkedException;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotAlreadyExistsException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotAlreadyOccupiedException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotNotFoundException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotNotOccupiedException;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.model.ParkingSpot;
import project.parking.repository.CarRepository;
import project.parking.repository.ParkingSpotRepository;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;
    private final CarRepository carRepository;
    private BookingService bookingService;

    public ParkingSpot findParkingSpotById(Long id) {

        return parkingSpotRepository.findById(id).orElseThrow(() -> new ParkingSpotNotFoundException("Parking spot not found!"));
    }

    public ParkingSpot parkCar(String registrationNumber, String parkingSpotNumber) {
        Car car = carRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() -> new CarNotFoundException("Car not found!"));

        if (isCarAlreadyParked(car)) {
            throw new CarAlreadyParkedException("Car is already parked!");
        }

        ParkingSpot parkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber)
                .orElseThrow(() -> new ParkingSpotNotFoundException("Parking spot not found!"));

        if (parkingSpot.isTaken()) {
            throw new ParkingSpotAlreadyOccupiedException("Parking spot is already occupied!");
        }

        Booking booking = bookingService.createBooking(registrationNumber, parkingSpotNumber);
        updateCarWithBooking(car, parkingSpotNumber, booking);
        updateParkingSpotWithCar(parkingSpot, registrationNumber, booking);

        return parkingSpotRepository.save(parkingSpot);
    }

    public ParkingSpot removeCarFromParkingSpot(String parkingSpotNumber) throws BookingException {
        ParkingSpot parkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber)
                .orElseThrow(() -> new ParkingSpotNotFoundException("Parking spot not found!"));

        if (!parkingSpot.isTaken()) {
            throw new ParkingSpotNotOccupiedException("Parking spot is not occupied");
        }

        Car car = carRepository.findByRegistrationNumber(parkingSpot.getRegistrationNumber())
                .orElseThrow(() -> new CarNotFoundException("Car not found!"));

        bookingService.endBooking(car.getRegistrationNumber());

        resetCarParkingState(car);
        resetParkingSpotState(parkingSpot);

        return parkingSpotRepository.save(parkingSpot);
    }

    private void resetParkingSpotState(ParkingSpot parkingSpot) {
        parkingSpot.setRegistrationNumber(null);
        parkingSpot.setTaken(false);
        parkingSpot.setBookingStartDate(null);
    }

    public ParkingSpot addNewParkingSpot(ParkingSpot parkingSpot) {
        if (doesParkingSpotAlreadyExist(parkingSpot.getNumber())) {
            throw new ParkingSpotAlreadyExistsException("Parking spot with this number already exists");
        }
        return parkingSpotRepository.save(parkingSpot);
    }

    public List<ParkingSpot> findAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }

    public boolean doesParkingSpotAlreadyExist(String parkingSpotNumber) {
        List<ParkingSpot> allParkingSpots = parkingSpotRepository.findAll();
        return allParkingSpots.stream()
                .anyMatch(parkingSpot -> parkingSpot.getNumber()
                        .equals(parkingSpotNumber));
    }

    public boolean isCarAlreadyParked(Car car) {
        return car.getParkingSpotNumber() != null;
    }

    private void updateParkingSpotWithCar(ParkingSpot parkingSpot, String registrationNumber, Booking booking) {
        parkingSpot.setTaken(true);
        parkingSpot.setRegistrationNumber(registrationNumber);
        parkingSpot.setBookingStartDate(booking.getBookingStartDate());
    }

    private void updateCarWithBooking(Car car, String parkingSpotNumber, Booking booking) {
        car.setParkingSpotNumber(parkingSpotNumber);
        car.addBooking(booking);
        carRepository.save(car);
    }

    private void resetCarParkingState(Car car) {
        car.setParkingSpotNumber(null);
        carRepository.save(car);
    }
}
