package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.ParkingSpotDTO;
import project.parking.model.ParkingSpot;

@Mapper(componentModel = "spring")
public interface ParkingSpotMapper {
    ParkingSpotDTO parkingSpotToParkingSpotDTO(ParkingSpot parkingSpot);
}
