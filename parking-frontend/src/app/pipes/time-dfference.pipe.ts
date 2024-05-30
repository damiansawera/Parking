import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeDifference',
  pure: false,
  standalone: true
})
export class TimeDifferencePipe implements PipeTransform {
  transform(bookingStartDate: Date | null): string {
    if(!bookingStartDate) {
      return '';
    }
    const now = new Date();
    const startDate = new Date(bookingStartDate);
    const diffMs = now.getTime() - startDate.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    
    return `${this.padNumber(hours)}:${this.padNumber(minutes)}`;
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
