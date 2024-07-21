package project.parking.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.model.UserEntity;

@Mapper(componentModel = "spring", uses = {WalletMapper.class})
public interface UserMapper {
    @Mapping(source = "wallet", target = "wallet")
    UserDTO userToUserDTO(UserEntity userEntity);
}
