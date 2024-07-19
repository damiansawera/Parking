package project.parking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.model.UserEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    public Optional<Car> findByRegistrationNumber(String registrationNumber);
    public Boolean existsByRegistrationNumber(String registrationNumber);
    List<Car> findByUserEntity(UserEntity userEntity);

}
