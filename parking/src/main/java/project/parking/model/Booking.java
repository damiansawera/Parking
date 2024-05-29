package project.parking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "BOOKING")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Transient
    private final int PRICE_PER_HOUR = 5;

    private int price;
    private Date bookingStartDate;
    private Date bookingEndDate;
    @Column(nullable = false)
    private String registrationNumber;
    @Column(nullable = false)
    private String parkingSpotNumber;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;
    private boolean isPaid;

    public Booking(String registrationNumber, String parkingSpotNumber) {
        this.bookingStartDate = new Date();
        this.registrationNumber = registrationNumber;
        this.parkingSpotNumber = parkingSpotNumber;
        this.isPaid = false;
    }

    public void setBookingEndDate(Date bookingEndDate) {
        this.bookingEndDate = bookingEndDate;
        calculatePrice();
    }

    private void calculatePrice() {
        if (this.bookingStartDate != null && this.bookingEndDate != null) {
            long duration = bookingEndDate.getTime() - bookingStartDate.getTime();
            int hours = (int) Math.ceil((double) duration / (1000 * 60 * 60));
            this.price = hours * PRICE_PER_HOUR;
        }
    }
}
