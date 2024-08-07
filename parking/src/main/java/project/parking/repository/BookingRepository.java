package project.parking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.parking.model.Booking;
import project.parking.model.UserEntity;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    public List<Booking> findByRegistrationNumber(String registrationNumber);
    List<Booking> findByUserEntity(UserEntity userEntity);
}
