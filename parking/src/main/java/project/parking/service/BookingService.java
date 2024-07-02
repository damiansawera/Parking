package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.DTOs.BookingDTO;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.mapper.BookingMapper;
import project.parking.model.Booking;
import project.parking.model.Car;
import project.parking.repository.BookingRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Transactional
public class BookingService {
    BookingRepository bookingRepository;
    BookingMapper bookingMapper;

    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingMapper::bookingToBookingDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO createBooking(String registrationNumber, String parkingSpotNumber) {
        Booking booking = new Booking(registrationNumber, parkingSpotNumber);
        return  bookingMapper.bookingToBookingDTO(bookingRepository.save(booking));
    }

    public Booking createAndLinkBooking(Car car, String parkingSpotNumber) {
        Booking booking = new Booking(car.getRegistrationNumber(), parkingSpotNumber);
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
}
