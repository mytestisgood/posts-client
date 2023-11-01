import { FormControl } from '@angular/forms';
import { FileWithLoading } from './common.models';

export const registrationInfoLink: string = '/registration/info';
export const registrationSetPasswordLink: string = '/registration/set-password';
export const registrationUploadFileLink: string = '/registration/upload-file';
export const registrationTransferMoneyLink: string = '/registration/transfer-money';
export const registrationPaymentInstructionLink: string = '/registration/payment-instruction';
export const registrationConfirmPaymentLink: string = '/registration/confirm-payment';
export const registrationVerifyCodeLink: string = '/registration/verify-code';
export const loginAfterRegistrationLink: string = '/registration/login';

export interface AllRegistrationSessionData {
  token?: string;
  departmentId?: string;
  companyName?: string;
  identifier?: string;
  yourName?: string;
  email?: string;
  phone?: string;
  acceptPrivacy?: boolean;
  finishInfoPage?: boolean;
  password?: string;
  finishPasswordPage?: boolean;
  files?: FileWithLoading[];
  finishFilesPage?: boolean;
  transferMoneyMode?: string;
  finishTransferMoneyMode?: boolean;
  paymentFiles?: FileWithLoading[];
  paymentDate?: string;
  accountNumber?: string;
  bankName?: string;
  branchNumber?: string;
  codeNumber?: string;
  finishConfirmPayment?: boolean;
}

export interface RegistrationInfoControls {
  companyName: FormControl<string | null>;
  identifier: FormControl<string | null>;
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  acceptPrivacy: FormControl<boolean | null>;
}

export interface UploadDocumentsControls {
  files: FormControl<FileWithLoading[] | null>;
}

export interface ConfirmPaymentControls {
  files: FormControl<FileWithLoading[] | null>;
  date: FormControl;
}

export interface AccountControls {
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
  identifier: string;
  yourName: string;
  email: string;
  phone: string;
  acceptPrivacy: boolean;
}

export interface UploadDocumentFormValue {
  files: File[] | null;
}

export interface AccountFormValue {
  accountNumber: string;
  bankName: string;
  branchNumber: string;
  codeNumber: string;
}
