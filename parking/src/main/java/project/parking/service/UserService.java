package project.parking.service;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.mapper.UserMapper;
import project.parking.model.User;
import project.parking.repository.UserRepository;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    
    public UserDTO registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (userExist(userRegistrationDTO.getUsername())) {
            throw new RuntimeException("User already exists!");
        }
        User user = new User();
        user.setUsername(userRegistrationDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        user.setEmail(userRegistrationDTO.getEmail());
        return userMapper.userToUserDTO(userRepository.save(user));
    }

    private boolean userExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
