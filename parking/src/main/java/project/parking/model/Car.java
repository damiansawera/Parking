package project.parking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CAR")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleModel;
    private String vehicleMake;
    private String color;
    private int productionYear;
    @Column(unique = true)
    private String registrationNumber;
    @Column(unique = true)
    private String parkingSpotNumber;
    @OneToMany(mappedBy = "car", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Booking> bookings = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity userEntity;

    public void addBooking(Booking booking) {
        bookings.add(booking);
        booking.setCar(this);
    }
}
