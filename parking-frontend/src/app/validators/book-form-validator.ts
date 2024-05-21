import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
export class BookFormValidator {

    static productionYearValidator(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        const valid = /^\d{4}$/.test(value);
        return valid ? null : { productionYear: true };
      }

    static restrictToDigits(control: AbstractControl): void {
        const value = control.value;
        if (value && /\D/.test(value)) {
          control.setValue(value.replace(/\D/g, ''), { emitEvent: false });
        }
      }

}