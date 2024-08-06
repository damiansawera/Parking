import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parkingEndTime',
  standalone: true
})
export class ParkingEndTimePipe implements PipeTransform {
  transform(endDate: Date): string {
    const hours = endDate.getHours().toString().padStart(2, '0');
    const minutes = endDate.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}