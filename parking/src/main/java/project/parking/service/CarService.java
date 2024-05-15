package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
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

    public void addNewCar(Car carBody) {
        if (doesRegistrationNumberExist(carBody)) {
            throw new ExistingRegistrationNumberException("Car with this registration number already exists");
        } else {
        carRepository.save(carBody);
        }
    }

    public Optional<Car> findCarById(Long id) {
        return carRepository.findById(id);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public void deleteById(Long id) {
        carRepository.deleteById(id);
    }

    public Car updateCar(Long id, Car carBody) {
        Optional<Car> car = carRepository.findById(id);
        if (car.isPresent() && !doesRegistrationNumberExist(carBody)) {
            Car updatedCar = car.get();
            updatedCar.setColor(carBody.getColor());
            updatedCar.setProductionYear(carBody.getProductionYear());
            updatedCar.setVehicleType(carBody.getVehicleType());
            updatedCar.setVehicleMake(carBody.getVehicleMake());
            updatedCar.setRegistrationNumber(carBody.getRegistrationNumber());
            carRepository.save(updatedCar);
            return updatedCar;
        } else {
            throw new IllegalArgumentException("Car with ID " + id + " not found");
        }
    }
    public boolean doesRegistrationNumberExist(Car carBody) {
        List<Car> allCars = carRepository.findAll();
        return allCars.stream()
                        .anyMatch(car -> car.getRegistrationNumber()
                        .equals(carBody.getRegistrationNumber()));
    }
}
