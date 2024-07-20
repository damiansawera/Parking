package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.parking.DTOs.ParkingSpotDTO;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.exceptions.carExceptions.CarAlreadyParkedException;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotAlreadyExistsException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotAlreadyOccupiedException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotNotFoundException;
import project.parking.exceptions.parkingSpotExceptions.ParkingSpotNotOccupiedException;
import project.parking.mapper.ParkingSpotMapper;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.model.ParkingSpot;
import project.parking.model.UserEntity;
import project.parking.repository.CarRepository;
import project.parking.repository.ParkingSpotRepository;
import project.parking.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class ParkingSpotService {
    private final ParkingSpotRepository parkingSpotRepository;
    private final CarRepository carRepository;
    private final UserService userService;
    private BookingService bookingService;
    private ParkingSpotMapper parkingSpotMapper;

    public ParkingSpotDTO findParkingSpotById(Long id) {
        return parkingSpotMapper.parkingSpotToParkingSpotDTO
                (parkingSpotRepository.findById(id).orElseThrow(() -> new ParkingSpotNotFoundException("Parking spot not found!")));
    }

    public ParkingSpotDTO parkCar(String registrationNumber, String parkingSpotNumber) {
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

        UserEntity user =userService.getCurrentUser();

        Booking booking = bookingService.createAndLinkBooking(car, parkingSpot.getNumber(), user);
        updateCarWithBooking(car, parkingSpotNumber, booking);
        updateParkingSpotWithCar(parkingSpot, registrationNumber, booking);

        return parkingSpotMapper.parkingSpotToParkingSpotDTO(parkingSpotRepository.save(parkingSpot));
    }

    public ParkingSpotDTO removeCarFromParkingSpot(String parkingSpotNumber) throws BookingException {
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

        return parkingSpotMapper.parkingSpotToParkingSpotDTO(parkingSpotRepository.save(parkingSpot));
    }

    private void resetParkingSpotState(ParkingSpot parkingSpot) {
        parkingSpot.setRegistrationNumber(null);
        parkingSpot.setTaken(false);
        parkingSpot.setBookingStartDate(null);
    }

    public ParkingSpotDTO addNewParkingSpot(ParkingSpot parkingSpot) {
        if (doesParkingSpotAlreadyExist(parkingSpot.getNumber())) {
            throw new ParkingSpotAlreadyExistsException("Parking spot with this number already exists");
        }
        return parkingSpotMapper.parkingSpotToParkingSpotDTO(parkingSpotRepository.save(parkingSpot));
    }

    public List<ParkingSpotDTO> findAllParkingSpots() {
        return parkingSpotRepository.findAll().stream()
                .map(parkingSpotMapper::parkingSpotToParkingSpotDTO)
                .collect(Collectors.toList());
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
