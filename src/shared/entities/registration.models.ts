import { FormControl } from '@angular/forms';
import {FileWithLoading, IS_LOGGED_IN} from './common.models';
import {IdAndNameResponse} from "@shared/api/models";

export const registrationInfoLink: string = '/registration/info';
export const registrationSetPasswordLink: string = '/registration/set-password';
export const registrationUploadFileLink: string = '/registration/upload-file';
export const registrationTransferMoneyLink: string = '/registration/transfer-money';
export const registrationPaymentInstructionLink: string = '/registration/payment-instruction';
export const registrationConfirmPaymentLink: string = '/registration/confirm-payment';
export const registrationVerifyCodeLink: string = '/registration/verify-code';
export const loginAfterRegistrationLink: string = '/login';

export interface AllRegistrationSessionData {
  userId?: string;
  employerId?: string;
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
  total?: number;
  employeesCount?: number;
  processId?: string;

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
  bankName: FormControl<IdAndNameResponse | null>;
  branchNumber: FormControl<IdAndNameResponse | null>;
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
 export interface UserProcessDataByStepResponse{
   data?: UserProcessSessionData,
   message?: string
   token?: string

 }

export interface UserProcessSessionData{
  registrationData?: AllRegistrationSessionData,
  isLoggedIn?: string
  specialHeaderToken?: string

}
