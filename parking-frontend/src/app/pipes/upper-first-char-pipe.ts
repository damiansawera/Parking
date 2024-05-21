import { Injectable, Pipe, PipeTransform } from "@angular/core";


@Pipe({
   name: 'upperFirstChar', 
   standalone: true
})
@Injectable({
    providedIn: 'root'
  })
export class UpperFirstCharPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return value;
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      }
}