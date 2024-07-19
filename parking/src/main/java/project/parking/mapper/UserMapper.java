package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.model.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO userToUserDTO(UserEntity userEntity);
}
