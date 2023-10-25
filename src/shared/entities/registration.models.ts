import { FormControl } from '@angular/forms';
import { FileWithLoading } from './common.models';

export const registrationInfoLink: string = '/registration/info';
export const registrationSetPasswordLink: string = '/registration/set-password';
export const registrationUploadFileLink: string = '/registration/upload-file';
export const registrationTransferMoneyLink: string = '/registration/transfer-money';
export const registrationPaymentInstructionLink: string = '/registration/payment-instruction';
export const registrationConfirmPaymentLink: string = '/registration/confirm-payment';
export const registrationVerifyCodeLink: string = '/registration/verify-code';

export type RegistrationDirection = 'forward' | 'back';
export type RegistrationFormValueType = {
  personalInfo: PersonalInfoFormValue,
  uploadDocumentInfo: UploadDocumentFormValue,
  paymentMethodInfo: PaymentMethodFormValue,
  verifyEmailInfo: VerificationEmailFormValue,
};

export interface RegistrationInfoControls {
  companyName: FormControl<string | null>;
  companyId: FormControl<string | null>;
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  acceptPrivacy: FormControl<boolean | null>;
}

export interface UploadDocumentsControls {
  files: FormControl<FileWithLoading[] | null>;
}

export interface PaymentMethodControls {
  accountNumber: FormControl<string | null>;
  bankName: FormControl<string | null>;
  branchNumber: FormControl<string | null>;
  codeNumber: FormControl<string | null>;
}

export interface VerificationEmailControls {
  emailVerifyCode: FormControl<string | null>;
}

export interface PersonalInfoFormValue {
  companyName: string;
  companyId: string;
  yourName: string;
  email: string;
  phone: string;
  acceptPrivacy: boolean;
}

export interface UploadDocumentFormValue {
  files: File[] | null;
}

export interface PaymentMethodFormValue {
  accountNumber: string;
  bankName: string;
  branchNumber: string;
  codeNumber: string;
}

export interface VerificationEmailFormValue {
  emailVerifyCode: string;
}
