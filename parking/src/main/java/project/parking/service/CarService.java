package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.parking.DTOs.BookingDTO;
import project.parking.DTOs.CarDTO;
import project.parking.exceptions.carExceptions.CarAlreadyParkedException;
import project.parking.exceptions.carExceptions.CarNotFoundException;
import project.parking.exceptions.carExceptions.ExistingRegistrationNumberException;
import project.parking.mapper.CarMapper;
import project.parking.model.Car;
import project.parking.model.UserEntity;
import project.parking.repository.CarRepository;
import project.parking.repository.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class CarService {

    private final CarRepository carRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final CarMapper carMapper;

    public CarDTO addNewCar(CarDTO carDTO) {
        if (doesRegistrationNumberExist(carDTO)) {
                                        throw new ExistingRegistrationNumberException("Car with this registration number already exists");
        }

        Car car = carMapper.carDTOToCar(carDTO);
        car.setUserEntity(userService.getCurrentUser());
        carRepository.save(car);
        return carMapper.carToCarDTO(car);
    }

    public CarDTO findCarById(Long id) {
        return carMapper.carToCarDTO(carRepository.findById(id)
                .orElseThrow(() -> new CarNotFoundException("Car with ID" + id +  " not found")));
        }

    public List<CarDTO> getAllCarsByUser(User user) {
        UserEntity userEntity = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return carRepository.findByUserEntity(userEntity).stream()
                .map(carMapper::carToCarDTO)
                .collect(Collectors.toList());
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

    public void deleteById(String registrationNumber) {
        Car car = carRepository.findByRegistrationNumber(registrationNumber)
                .orElseThrow(() -> new CarNotFoundException("Car with registration number " + registrationNumber + " not found"));

        if (isCarParked(car.getId())) {
            throw new CarAlreadyParkedException("Car is parked. Finish parking first to delete a car");
        }

        carRepository.deleteById(car.getId());
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

    public boolean isCarParked(Long id) {
        return carRepository.findById(id)
                .map(car -> car.getParkingSpotNumber() != null)
                .orElseThrow(() -> new CarNotFoundException("Car with ID " + id + " not found"));
    }

}
