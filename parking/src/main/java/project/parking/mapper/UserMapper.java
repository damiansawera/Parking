package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.CarDTO;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.model.Car;
import project.parking.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User userRegistrationDTOToUser(UserRegistrationDTO userRegistrationDTO);
    UserDTO userToUserDTO(User user);
}
