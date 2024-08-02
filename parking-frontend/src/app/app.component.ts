import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParkingSpotService } from './services/parking-spot-service/parking-spot.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.parkingSpotService.loadAllParkingSpots().subscribe();
  }

  constructor(private parkingSpotService: ParkingSpotService) {}
  title = 'parking-frontend';
}
