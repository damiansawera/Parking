package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.exceptions.bookingExceptions.BookingException;
import project.parking.model.Booking;
import project.parking.repository.BookingRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class BookingService {
    BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking createBooking(String registrationNumber, String parkingSpotNumber) {
        Booking booking = new Booking(registrationNumber, parkingSpotNumber);
        return bookingRepository.save(booking);
    }

    public Booking getActiveBooking(String registrationNumber) {
        List<Booking> bookings = bookingRepository.findByRegistrationNumber(registrationNumber);

        Optional<Booking> activeBooking = bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst();
        if (activeBooking.isEmpty())
            throw new BookingException("No bookings found for registration number: " + registrationNumber);

        return activeBooking.get();
    }

    public Booking endBooking(String registrationNumber) throws BookingException {
        List<Booking> bookings = bookingRepository.findByRegistrationNumber(registrationNumber);
        if (bookings.isEmpty()) {
            throw new BookingException("No bookings found for registration number: " + registrationNumber);
        }

        Optional<Booking> notPaidBooking = bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst();

        if (notPaidBooking.isEmpty()) {
            throw new BookingException("No unpaid bookings found for registration number: " + registrationNumber);
        }

        Booking booking = notPaidBooking.get();
        booking.setBookingEndDate(new Date());
        booking.setPaid(true);

        return bookingRepository.save(booking);
    }
}
