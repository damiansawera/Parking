package project.parking.service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import project.parking.DTOs.WalletDTO;
import project.parking.exceptions.walletExceptions.WalletException;
import project.parking.mapper.WalletMapper;
import project.parking.model.UserEntity;
import project.parking.model.Wallet;
import project.parking.repository.WalletRepository;

@Service
@Transactional
@AllArgsConstructor
public class WalletService {
    private final WalletRepository walletRepository;
    private final WalletMapper walletMapper;
    private final UserService userService;

    public Wallet createWallet(UserEntity userEntity) {
        Wallet wallet = new Wallet();
        wallet.setBalance(0);
        wallet.setCurrency("PLN");
        wallet.setUserEntity(userEntity);

        return walletRepository.save(wallet);
    }

    public WalletDTO topUpWalletBalance(float amount) {
       Wallet wallet = walletRepository.findByUserEntity(userService.getCurrentUser())
               .orElseThrow(() -> new WalletException("Wallet not found"));
       wallet.setBalance(wallet.getBalance() + amount);

       return walletMapper.walletToWalletDTO(walletRepository.save(wallet));
    }

    public WalletDTO topUpWalletBalanceByUserId(float amount, Long userId) {
        Wallet wallet = walletRepository.findByUserEntityId(userId)
                .orElseThrow(() -> new WalletException("Wallet not found"));
        wallet.setBalance(wallet.getBalance() + amount);

        return walletMapper.walletToWalletDTO(walletRepository.save(wallet));
    }

    public WalletDTO deductFromBalance(float amount) {
        Wallet wallet = walletRepository.findByUserEntity(userService.getCurrentUser())
                .orElseThrow(() -> new WalletException("Wallet not found"));
        float newBalance = wallet.getBalance() - amount;
        if (newBalance < 0) {
            throw new WalletException("Insufficient Amount");
        }
        wallet.setBalance(newBalance);

        return walletMapper.walletToWalletDTO(walletRepository.save(wallet));
    }
}
