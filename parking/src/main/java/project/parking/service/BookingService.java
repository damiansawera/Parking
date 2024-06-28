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

        return bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst()
                .orElseThrow(() -> new BookingException("No bookings found for registration number: " + registrationNumber));
    }

    public Booking endBooking(String registrationNumber) throws BookingException {
        List<Booking> bookings = bookingRepository.findByRegistrationNumber(registrationNumber);
        if (bookings.isEmpty()) {
            throw new BookingException("No bookings found for registration number: " + registrationNumber);
        }
        return endBookingAndPay(registrationNumber, bookings);
    }

    private Booking endBookingAndPay(String registrationNumber, List<Booking> bookings) {
        Booking notPaidBooking = bookings
                .stream()
                .filter(booking -> !booking.isPaid())
                .findFirst()
                .orElseThrow(() -> new BookingException("No unpaid bookings found for registration number: " + registrationNumber));

        notPaidBooking.setBookingEndDate(new Date());
        notPaidBooking.setPaid(true);

        return bookingRepository.save(notPaidBooking);
    }
}
