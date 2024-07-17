package project.parking.config;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.parking.enums.Role;
import project.parking.model.UserEntity;
import project.parking.repository.UserRepository;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity userEntity = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Exception"));
        return new User(userEntity.getUsername(), userEntity.getPassword(),mapRolesToAuthorities(userEntity.getRoles()));
    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(Set<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.name()))
                .collect(Collectors.toList());
    }
}
