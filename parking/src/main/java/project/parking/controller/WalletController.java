package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.parking.DTOs.WalletDTO;
import project.parking.service.WalletService;

@RestController
@RequestMapping("/wallet")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class WalletController {
private WalletService walletService;

    @PutMapping("/top-up")
    public ResponseEntity<WalletDTO> topUpWalletBalance(@RequestParam float amount) {
        return ResponseEntity.status(HttpStatus.OK).body(walletService.topUpWalletBalance(amount));
}
    @PutMapping("/deduct")
    public ResponseEntity<WalletDTO> deductFromBalance(@RequestParam float amount) {
        return ResponseEntity.status(HttpStatus.OK).body(walletService.deductFromBalance(amount));
    }
}
