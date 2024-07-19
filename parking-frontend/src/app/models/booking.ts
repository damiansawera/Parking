export interface Booking {
    bookingStartDate: Date;
    bookingEndDate?: Date;
    registrationNumber: string;
    parkingSpotNumber: string;
    price: number;
    paid: boolean;
}