package project.parking.mapper;

import org.mapstruct.Mapper;
import project.parking.DTOs.WalletDTO;
import project.parking.model.Wallet;

@Mapper(componentModel = "spring")
public interface WalletMapper {
    WalletDTO walletToWalletDTO(Wallet wallet);
}
