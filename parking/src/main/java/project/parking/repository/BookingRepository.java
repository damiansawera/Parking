package project.parking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import project.parking.model.Booking;
import project.parking.model.UserEntity;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    public List<Booking> findByRegistrationNumber(String registrationNumber);

    List<Booking> findByUserEntity(UserEntity userEntity);

    @Query("SELECT FUNCTION('DAY', b.bookingStartDate) AS day, COUNT(b) AS count " +
            "FROM Booking b " +
            "WHERE FUNCTION('YEAR', b.bookingStartDate) = :year " +
            "AND FUNCTION('MONTH', b.bookingStartDate) = :month " +
            "GROUP BY FUNCTION('DAY', b.bookingStartDate) " +
            "ORDER BY day")
    List<Object[]> countBookingsByDay(@Param("year") int year, @Param("month") int month);
}
