package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.CarDTO;
import project.parking.model.Car;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarDTO carToCarDTO(Car car);
    Car carDTOToCar(CarDTO carDTO);
}
