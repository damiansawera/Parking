package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.carExceptions.ExistingRegistrationNumberException;
import project.parking.model.Car;
import project.parking.repository.CarRepository;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;

    public Car addNewCar(Car carBody) {
        if (doesRegistrationNumberExist(carBody)) {
            throw new ExistingRegistrationNumberException("Car with this registration number already exists");
        }
        return carRepository.save(carBody);
    }

    public Car findCarById(Long id) {
        return carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Car with ID" + id +  " not found"));
        }

    public Car findCarByRegistrationNumber(String registrationNumber) {
        return carRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() -> new CarNotFoundException("Car with registration number " + registrationNumber + " not found"));

    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public void deleteById(Long id) {
        if (!carRepository.existsById(id)) {
            throw new CarNotFoundException("Car with ID " + id + " not found");
        }
        carRepository.deleteById(id);
    }

    public Car updateCar(Long id, Car carBody) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Car with ID " + id + " not found"));
        
        if (doesRegistrationNumberExist(carBody)) {
            car.setColor(carBody.getColor());
            car.setProductionYear(carBody.getProductionYear());
            car.setVehicleModel(carBody.getVehicleModel());
            car.setVehicleMake(carBody.getVehicleMake());
            car.setRegistrationNumber(carBody.getRegistrationNumber());
            carRepository.save(car);
        }
        return car;
    }

    public boolean doesRegistrationNumberExist(Car carBody) {
        return carRepository.existsByRegistrationNumber(carBody.getRegistrationNumber());
    }
}
