import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
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
      Validators.pattern('^(?!^-)[\\w-]+(?:[\\.-][\\w-]+)*(?:[\\.+][\\w-]+)*@\\w+(?:[\\.-]' +
        '\\w+)*(?:\\.[A-Za-z]{2,4})+$'),
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