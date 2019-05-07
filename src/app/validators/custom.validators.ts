import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static minDate(date: Date): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (!c.value) {
        return null;
      }

      const value = new Date(c.value);

      if (value < date) {
        return {
          minDate: true
        };
      }

      return null;
    };
  }
}
