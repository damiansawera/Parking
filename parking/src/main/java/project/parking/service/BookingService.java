package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import project.parking.DTOs.BookingDTO;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.mapper.BookingMapper;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.model.UserEntity;
import project.parking.repository.BookingRepository;
import project.parking.repository.UserRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class BookingService {
    BookingRepository bookingRepository;
    UserRepository userRepository;
    BookingMapper bookingMapper;

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingMapper::bookingToBookingDTO)
                .collect(Collectors.toList());
    }

    public List<BookingDTO> getAllBookingsByUser(User user) {
        UserEntity userEntity = userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return bookingRepository.findByUserEntity(userEntity).stream()
                .map(bookingMapper::bookingToBookingDTO)
                .collect(Collectors.toList());
    }

    public List<Integer> getBookingsCountByMonth(int year, int month) {
        validateMonthYear(year, month);

        List<Object[]> results = bookingRepository.countBookingsByDay(year, month);
        List<Integer> dailyCounts = new ArrayList<>();

        // Initialize counts for each day of the month to 0
        for (int i = 1; i <= 31; i++) {
            dailyCounts.add(0);
        }

        // Populate dailyCounts with actual values from the query results
        for (Object[] result : results) {
            int day = (Integer) result[0];
            long count = (Long) result[1];
            dailyCounts.set(day - 1, (int) count);
        }

        return dailyCounts;
    }

    public BookingDTO createBooking(String registrationNumber, String parkingSpotNumber, UserEntity user) {
        Booking booking = new Booking(registrationNumber, parkingSpotNumber, user);
        return  bookingMapper.bookingToBookingDTO(bookingRepository.save(booking));
    }

    public Booking createAndLinkBooking(Car car, String parkingSpotNumber, UserEntity user) {
        Booking booking = new Booking(car.getRegistrationNumber(), parkingSpotNumber, user);
        booking.setCar(car);
        return bookingRepository.save(booking);
    }

    public BookingDTO getActiveBooking(String registrationNumber) {
        List<BookingDTO> bookings = bookingRepository.findByRegistrationNumber(registrationNumber)
                .stream()
                .map(bookingMapper::bookingToBookingDTO)
                .toList();

        return bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst()
                .orElseThrow(() -> new BookingException("No bookings found for registration number: " + registrationNumber));
    }

    public BookingDTO endBooking(String registrationNumber) throws BookingException {
        List<Booking> bookings = bookingRepository.findByRegistrationNumber(registrationNumber);
        if (bookings.isEmpty()) {
            throw new BookingException("No bookings found for registration number: " + registrationNumber);
        }
        return endBookingAndPay(registrationNumber, bookings);
    }

    private BookingDTO endBookingAndPay(String registrationNumber, List<Booking> bookings) {
        Booking notPaidBooking = bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst()
                .orElseThrow(() -> new BookingException("No unpaid bookings found for registration number: " + registrationNumber));

        notPaidBooking.setBookingEndDate(new Date());
        notPaidBooking.setPaid(true);

        return bookingMapper.bookingToBookingDTO(bookingRepository.save(notPaidBooking));
    }

    private void validateMonthYear(int year, int month) {
        if (year < 0) {
            throw new IllegalArgumentException("Year must be a positive number.");
        }
        if (month < 1 || month > 12) {
            throw new IllegalArgumentException("Month must be between 1 and 12.");
        }
    }
}
