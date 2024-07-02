package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.BookingDTO;
import project.parking.model.Booking;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    BookingDTO bookingToBookingDTO(Booking booking);
}
