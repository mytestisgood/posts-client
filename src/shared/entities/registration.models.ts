import { FormControl } from '@angular/forms';

export const REGISTRATION_TOKEN: string = 'registrationToken';
export const DEPARTMENT_ID: string = 'departmentId';

export enum RegistrationFormTypeEnum {
  PersonalInfo = 'personalInfo',
  UploadDocumentInfo = 'uploadDocumentInfo',
  PaymentMethodInfo = 'paymentMethodInfo',
  VerifyEmailInfo = 'verifyEmailInfo',
}

export enum RegistrationDirectionEnum {
  Forward = 'forward',
  Back = 'back',
}

export enum RegistrationStepEnum {
  PersonalInfoStep = 'personalInfoStep',
  UploadDocumentStep = 'uploadDocumentStep',
  PaymentMethodStep = 'paymentMethodStep',
  VerifyEmailStep = 'verifyEmailStep',
}

export type RegistrationStep = 'personalInfo' | 'uploadDocumentInfo' | 'paymentMethodInfo' | 'verifyEmailInfo';
export type RegistrationDirection = 'forward' | 'back';
export type RegistrationFormValueType = {
  personalInfo: PersonalInfoFormValue,
  uploadDocumentInfo: UploadDocumentFormValue,
  paymentMethodInfo: PaymentMethodFormValue,
  verifyEmailInfo: VerificationEmailFormValue,
};

export interface PersonalInfoControls {
  companyName: FormControl<string | null>;
  companyId: FormControl<string | null>;
  yourName: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  acceptPrivacy: FormControl<boolean | null>;
}

export interface UploadDocumentsControls {
  files: FormControl<File[] | null>;
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

export enum PaymentMethodTabs {
  Bank = 0,
  InstitutionalNumber = 1,
}
