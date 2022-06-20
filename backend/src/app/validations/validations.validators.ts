import { FormControl, FormGroup } from '@angular/forms';

// Validations : Allow Alphanumeric char and space only
export class TextFieldValidator {
  static validTextField(fc: FormControl) {
    if (fc.value !== undefined && fc.value !== '' && fc.value !== null) {
      const regex = /^[0-9a-zA-z]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        // hame yha ek object return krna rhta h error ke liye  agar if condition satisfy nhi hogi to;
        return { validTextField: true };
      }
    } else {
      return null;
    }
  }
}

// Validations : Allow Numeric char only
export class NumericFieldValidator {
  static validNumericField(fc: FormControl) {
    if (fc.value !== undefined && fc.value !== '' && fc.value !== null) {
      const regex = /[0-9]+/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validNumericField: true };
      }
    } else {
      return null;
    }
  }
}
// Validations : Allow char and space only
export class CharFieldValidator {
  static validCharField(fc: FormControl) {
    if (fc.value !== undefined && fc.value !== '' && fc.value !== null) {
      const regex = /^[a-zA ]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validCharField: true };
      }
    } else {
      return null;
    }
  }
}
// Validations : Allow Email  only
export class EmailValidator {
  static validEmail(fc: FormControl) {
    if (fc.value !== undefined && fc.value !== '' && fc.value !== null) {
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
      if (regex.test(fc.value)) {
        return null;
      } else {
        return { validEmail: true };
      }
    } else {
      return null;
    }
  }
}

//Validations : Not Allowed Whitespace only
export class NoWhiteSpaceValidator {
  static noWhiteSpaceValidator(fc: FormControl) {
    if (fc.value != undefined && fc.value !== '' && fc.value !== null) {
      const isWhiteSpace = fc.value.toString().trim().length == 0;
      if (!isWhiteSpace) {
        return null;
      } else {
        return { noWhiteSpaceValidator: true };
      }
    } else {
      return null;
    }
  }
}

//Validations : To Check 2 field to be same
export function MustMatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingcontrol = formGroup.controls[matchingControlName];

    if (matchingcontrol.errors && !matchingcontrol.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingcontrol.value) {
      matchingcontrol.setErrors({ mustMatch: true });
    } else {
      matchingcontrol.setErrors(null);
    }
  };
}
