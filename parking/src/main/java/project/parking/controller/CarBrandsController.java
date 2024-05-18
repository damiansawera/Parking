package project.parking.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.parking.enums.CarBrands;

@RestController
@AllArgsConstructor
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class CarBrandsController {

    @GetMapping("/car-brands")
    public CarBrands[] getCarBrands() {
        return CarBrands.values();
    }
}
