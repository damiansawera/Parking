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
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;
    private final CarRepository carRepository;
    private BookingService bookingService;

    public Optional<ParkingSpot> findParkingSpotById(Long id) {
        return parkingSpotRepository.findById(id);
    }

    public ParkingSpot parkCar(String registrationNumber, String parkingSpotNumber) {
        Optional<Car> optionalCar = carRepository.findByRegistrationNumber(registrationNumber);
        if (optionalCar.isEmpty()) {
            throw new CarNotFoundException("Car not found!");
        }
        Car car = optionalCar.get();

        if (isCarAlreadyParked(car)) {
            throw new CarAlreadyParkedException("Car is already parked!");
        }

        Optional<ParkingSpot> optionalParkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber);
        if (optionalParkingSpot.isEmpty()) {
            throw new ParkingSpotNotFoundException("Parking spot not found!");
        }
        ParkingSpot parkingSpot = optionalParkingSpot.get();
        if (parkingSpot.isTaken()) {
            throw new ParkingSpotAlreadyOccupiedException("Parking spot is already occupied!");
        }

        Booking booking = bookingService.createBooking(registrationNumber, parkingSpotNumber);
        car.setParkingSpotNumber(parkingSpotNumber);
        car.addBooking(booking);
        carRepository.save(car);

        parkingSpot.setTaken(true);
        parkingSpot.setRegistrationNumber(registrationNumber);
        parkingSpotRepository.save(parkingSpot);

        return parkingSpot;
    }
    public ParkingSpot removeCarFromParkingSpot(String parkingSpotNumber) throws BookingException {
        Optional<ParkingSpot> optionalParkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber);
        if (optionalParkingSpot.isEmpty()) {
            throw new ParkingSpotNotFoundException("Parking spot not found!");
        }
        ParkingSpot parkingSpot = optionalParkingSpot.get();
        if (!parkingSpot.isTaken()) {
            throw new ParkingSpotNotOccupiedException("Parking spot is not occupied");
        }

            Optional<Car> car = carRepository.findByRegistrationNumber(parkingSpot.getRegistrationNumber());
        if (car.isEmpty()) {
            throw new CarNotFoundException("Car not found!");
        }

            Car updatedCar = car.get();
            updatedCar.setParkingSpotNumber(null);
            bookingService.endBooking(updatedCar.getRegistrationNumber());
            carRepository.save(updatedCar);

            parkingSpot.setRegistrationNumber(null);
            parkingSpot.setTaken(false);
            parkingSpotRepository.save(parkingSpot);

        return parkingSpot;
    }

    public void addNewParkingSpot(ParkingSpot parkingSpot) {
        if (doesParkingSpotAlreadyExist(parkingSpot.getNumber())) {
            throw new ParkingSpotAlreadyExistsException("Parking spot with this number already exists");
        }
        parkingSpotRepository.save(parkingSpot);
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
}
