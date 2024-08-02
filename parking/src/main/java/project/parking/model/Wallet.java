package project.parking.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "WALLET")
public class Wallet {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    private float balance;
    private String currency;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    @JsonIgnore
    private UserEntity userEntity;
}
