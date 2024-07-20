package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import project.parking.DTOs.*;
import project.parking.config.JwtGenerator;
import project.parking.enums.Role;
import project.parking.exceptions.authExceptions.AuthException;
import project.parking.mapper.UserMapper;
import project.parking.model.UserEntity;
import project.parking.repository.UserRepository;

import java.util.Date;

@Service
@AllArgsConstructor
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;
    private final UserDetailsService userDetailsService;

    public UserDTO registerUser(UserRegistrationDTO userRegistrationDTO) {
        if (userExist(userRegistrationDTO.getUsername())) {
            throw new RuntimeException("User already exists!");
        }
        UserEntity userEntity = new UserEntity();
        userEntity.setFullName(userRegistrationDTO.getFullName());
        userEntity.setUsername(userRegistrationDTO.getUsername());
        userEntity.setPassword(passwordEncoder.encode(userRegistrationDTO.getPassword()));
        userEntity.setEmail(userRegistrationDTO.getEmail());
        userEntity.setMemberSince(new Date());
        userEntity.addRole(Role.USER);
        return userMapper.userToUserDTO(userRepository.save(userEntity));
    }

    public AuthResponseDTO loginUser(UserLoginDTO userLoginDTO) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userLoginDTO.getUsername(), userLoginDTO.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String accessToken = jwtGenerator.generateToken(authentication);
        String refreshToken = jwtGenerator.generateRefreshToken(authentication);
        return new AuthResponseDTO(accessToken, refreshToken);
    }

    public RefreshTokenResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
        String refreshToken = refreshTokenRequest.getRefreshToken();
        if (jwtGenerator.validateToken(refreshToken)) {
            String username = jwtGenerator.getUsernameFromToken(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (userDetails != null) {
                String newAccessToken = jwtGenerator.generateToken(userDetails);
                return new RefreshTokenResponse(newAccessToken, refreshToken);
            } else {
                throw new UsernameNotFoundException("User not found");
            }
        } else {
            throw new AuthException("Invalid refresh token");
        }
    }

    private boolean userExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }
}
