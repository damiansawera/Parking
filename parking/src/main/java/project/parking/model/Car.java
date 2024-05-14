package project.parking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleType;
    private String vehicleMake;
    private String color;
    private int productionYear;
    @Column(unique = true)
    private String registrationNumber;
    @Column(unique = true)
    private String ParkingSpotNumber;
}
