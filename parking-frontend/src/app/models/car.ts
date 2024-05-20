import { CarMakes } from "../enums/car-makes";

export interface Car {
    vehicleMake: keyof typeof CarMakes;
    vehicleModel: string,
    color: string;
    productionYear: number;
    registrationNumber: string;
    parkingSpotNumber?: string;
}