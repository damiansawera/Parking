import { TestBed } from '@angular/core/testing';
import { ParkingSpotService } from './parking-spot.service';

describe('DataService', () => {
  let service: ParkingSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
