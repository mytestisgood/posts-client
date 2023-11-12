import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BUSINESS_NUMBER_REGEX, emailValidatorPattern, israelMobilePhoneValidatorPattern} from './common.models';
import {
  AccountControls,
  ConfirmPaymentControls,
  RegistrationInfoControls,
  UploadDocumentsControls,
  VerificationEmailControls,
} from './registration.models';
import {IdAndNameResponse} from "@shared/api/models";

export function registrationInfoFormMapper(): FormGroup<RegistrationInfoControls> {
  return new FormGroup<RegistrationInfoControls>({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    identifier: new FormControl('', [Validators.required, Validators.pattern(BUSINESS_NUMBER_REGEX)]),
    email: new FormControl('', [Validators.required, Validators.pattern(emailValidatorPattern) ]),
    yourName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });
}

export function uploadingDocumentsFormMapper(): FormGroup<UploadDocumentsControls> {
  return new FormGroup<UploadDocumentsControls>({
    files: new FormControl(),
  });
}

export function confirmPaymentFormMapper(): FormGroup<ConfirmPaymentControls> {
  return new FormGroup<ConfirmPaymentControls>({
    files: new FormControl(),
    date: new FormControl(),
  });
}

export function verifyEmailFormMapper(): FormGroup<VerificationEmailControls> {
  return new FormGroup<VerificationEmailControls>({
    emailVerifyCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
}

export function paymentMethodFormMapper(): FormGroup<AccountControls> {
  return new FormGroup<AccountControls>({
    accountNumber: new FormControl('', [Validators.required]),
    bankName: new FormControl('', [Validators.required]),
    branchNumber: new FormControl('', [Validators.required]),
  });
}
