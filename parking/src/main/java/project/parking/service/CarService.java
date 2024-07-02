package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.DTOs.CarDTO;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.carExceptions.ExistingRegistrationNumberException;
import project.parking.mapper.CarMapper;
import project.parking.model.Car;
import project.parking.repository.CarRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public CarDTO addNewCar(CarDTO carDTO) {
        if (doesRegistrationNumberExist(carDTO)) {
            throw new ExistingRegistrationNumberException("Car with this registration number already exists");
        }
        Car car = carMapper.carDTOToCar(carDTO);
        return carMapper.carToCarDTO(carRepository.save(car));
    }

    public CarDTO findCarById(Long id) {
        return carMapper.carToCarDTO(carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Car with ID" + id +  " not found")));
        }

    public CarDTO findCarByRegistrationNumber(String registrationNumber) {
        return carMapper.carToCarDTO(carRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() -> new CarNotFoundException("Car with registration number " + registrationNumber + " not found")));
    }

    public List<CarDTO> findAll() {
        return carRepository.findAll()
                .stream()
                .map(carMapper::carToCarDTO)
                .collect(Collectors.toList());
    }

    public void deleteById(Long id) {
        if (!carRepository.existsById(id)) {
            throw new CarNotFoundException("Car with ID " + id + " not found");
        }
        carRepository.deleteById(id);
    }

    public CarDTO updateCar(Long id, CarDTO carDTO) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Car with ID " + id + " not found"));
        
        if (doesRegistrationNumberExist(carDTO)) {
            car.setColor(carDTO.getColor());
            car.setProductionYear(carDTO.getProductionYear());
            car.setVehicleModel(carDTO.getVehicleModel());
            car.setVehicleMake(carDTO.getVehicleMake());
            car.setRegistrationNumber(carDTO.getRegistrationNumber());
            carRepository.save(car);
        }
        return carMapper.carToCarDTO(car);
    }

    public boolean doesRegistrationNumberExist(CarDTO carDTO) {
        return carRepository.existsByRegistrationNumber(carDTO.getRegistrationNumber());
    }
}
