package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.exceptions.ParkingSpotNotOccupiedException;
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

    public Optional<ParkingSpot> findParkingSpotById(Long id) {
        return parkingSpotRepository.findById(id);
    }

    public ParkingSpot parkCar(String registrationNumber, String parkingSpotNumber) {
        Optional<Car> car = carRepository.findByRegistrationNumber(registrationNumber);
        ParkingSpot updatedParkingSpot = null;
        if (car.isPresent()) {
            Car updatedCar = car.get();
            updatedCar.setParkingSpotNumber(parkingSpotNumber);
            carRepository.save(updatedCar);
            updatedParkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber);
            updatedParkingSpot.setTaken(true);
            updatedParkingSpot.setRegistrationNumber(registrationNumber);
            parkingSpotRepository.save(updatedParkingSpot);
        }
        return updatedParkingSpot;
    }
    public ParkingSpot removeCarFromParkingSpot(String parkingSpotNumber) {
        ParkingSpot parkingSpot = parkingSpotRepository.findByNumber(parkingSpotNumber);
        if (!parkingSpot.isTaken()) {
            throw new ParkingSpotNotOccupiedException("Parking spot is not occupied");
        } else {
            Optional<Car> car = carRepository.findByRegistrationNumber(parkingSpot.getRegistrationNumber());
            Car updatedCar = car.get();
            updatedCar.setParkingSpotNumber(null);
            carRepository.save(updatedCar);
            parkingSpot.setRegistrationNumber(null);
            parkingSpot.setTaken(false);
            parkingSpotRepository.save(parkingSpot);
        }
        return parkingSpot;
    }

    public void addNewParkingSpot(ParkingSpot parkingSpot) {
        parkingSpotRepository.save(parkingSpot);
    }

    public List<ParkingSpot> findAllParkingSpots() {
        return parkingSpotRepository.findAll();
    }
}
