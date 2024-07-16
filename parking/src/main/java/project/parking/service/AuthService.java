package project.parking.service;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.parking.DTOs.AuthResponseDTO;
import project.parking.DTOs.UserDTO;
import project.parking.DTOs.UserLoginDTO;
import project.parking.DTOs.UserRegistrationDTO;
import project.parking.config.JwtGenerator;
import project.parking.enums.Role;
import project.parking.mapper.UserMapper;
import project.parking.model.UserEntity;
import project.parking.repository.UserRepository;

@Service
@AllArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;

    public UserDTO registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (userExist(userRegistrationDTO.getUsername())) {
            throw new RuntimeException("User already exists!");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setUsername(userRegistrationDTO.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        userEntity.setEmail(userRegistrationDTO.getEmail());
        userEntity.addRole(Role.USER);
        return userMapper.userToUserDTO(userRepository.save(userEntity));
    }

    public AuthResponseDTO loginUser(UserLoginDTO userLoginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new AuthResponseDTO(token);
    }

    private boolean userExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
