package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.parking.DTOs.UserDTO;
import project.parking.mapper.UserMapper;
import project.parking.model.UserEntity;
import project.parking.repository.UserRepository;

@Service
@AllArgsConstructor
@Transactional
public class UserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    public UserDTO getUserInfo() {
        UserEntity userEntity = userRepository.findByUsername(getCurrentUser().getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return userMapper.userToUserDTO(userEntity);
    }

    public UserEntity getCurrentUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
