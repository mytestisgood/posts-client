import { FormControl, FormGroup, Validators } from '@angular/forms';
import { emailValidatorPattern } from './common.models';
import {
  PaymentMethodControls,
  PersonalInfoControls,
  UploadDocumentsControls,
  VerificationEmailControls,
} from './registration.models';

export function personalInfoFormMapper(): FormGroup<PersonalInfoControls> {
  return new FormGroup<PersonalInfoControls>({
    companyName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    companyId: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    yourName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    acceptPrivacy: new FormControl(false, [Validators.requiredTrue]),
  });
}

export function uploadingDocumentsFormMapper(): FormGroup<UploadDocumentsControls> {
  return new FormGroup<UploadDocumentsControls>({
    files: new FormControl(),
  });
}

export function verifyEmailFormMapper(): FormGroup<VerificationEmailControls> {
  return new FormGroup<VerificationEmailControls>({
    emailVerifyCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
}

export function paymentMethodFormMapper(): FormGroup<PaymentMethodControls> {
  return new FormGroup<PaymentMethodControls>({
    accountNumber: new FormControl('', [Validators.required]),
    bankName: new FormControl('', [Validators.required]),
    branchNumber: new FormControl('', [Validators.required]),
    codeNumber: new FormControl('', [Validators.required]),
  });
}