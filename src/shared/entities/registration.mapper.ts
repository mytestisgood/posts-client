import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {emailValidatorPattern, fiveNumberRegex, israelMobilePhoneValidatorPattern, onlyLetters} from './common.models';
import {
  AccountControls,
  ConfirmPaymentControls,
  RegistrationInfoControls,
  UploadDocumentsControls,
  VerificationEmailControls,
} from './registration.models';

export function registrationInfoFormMapper(): FormGroup<RegistrationInfoControls> {
  return new FormGroup<RegistrationInfoControls>({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3) && Validators.pattern(onlyLetters)]),
    identifier: new FormControl('', [Validators.required, validIDValueValidator()]),
    email: new FormControl('', [Validators.required, Validators.pattern(emailValidatorPattern) ]),
    yourName: new FormControl('', [Validators.required, Validators.minLength(3) && Validators.pattern(onlyLetters)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });
}
export function validIDValueValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const id = control.value;
    let isValid:boolean;

    if (id.length !== 9 || isNaN(id)) {  // Make sure ID is formatted properly
      return { invalidValue: true };
    }
    let sum = 0, incNum;

    for (let i = 0; i < id.length; i++) {
      incNum = Number(id[i]) * ((i % 2) + 1);  // Multiply number by 1 or 2
      sum += (incNum > 9) ? incNum - 9 : incNum;  // Sum the digits up and add to total
    }
    isValid = (sum % 10 === 0);

    return isValid ? null : { invalidValue: true };
  };
}
export function uploadingDocumentsFormMapper(): FormGroup<UploadDocumentsControls> {
  return new FormGroup<UploadDocumentsControls>({
    files: new FormControl(),
  });
}

export function confirmPaymentFormMapper(): FormGroup<ConfirmPaymentControls> {
  return new FormGroup<ConfirmPaymentControls>({
    files: new FormControl(),
    date: new FormControl(null, [Validators.required]),
  });
}

export function verifyEmailFormMapper(): FormGroup<VerificationEmailControls> {
  return new FormGroup<VerificationEmailControls>({
    emailVerifyCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
}

export function paymentMethodFormMapper(): FormGroup<AccountControls> {
  return new FormGroup<AccountControls>({
    accountNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    bankName: new FormControl(null, [Validators.required]),
    branchNumber: new FormControl(null, [Validators.required]),
  });
}
