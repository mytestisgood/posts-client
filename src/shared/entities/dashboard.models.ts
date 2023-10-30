import { FormControl } from '@angular/forms';
import {
  ChatResponse,
  DocumentTypes,
  FeedbacksRecordsListItems,
  IdAndNameResponse,
  ProcessResponseItems,
} from '@shared/api/models';
import { FileWithLoading } from './common.models';

export interface DashboardHeaderGroupControls {
  organization: FormControl<string | IdAndNameResponse | null>;
  employer: FormControl<string | IdAndNameResponse | null>;
  department: FormControl<string | IdAndNameResponse | null>;
}

export interface DashboardCreateNewChatGroupControls {
  document: FormControl<IdAndNameResponse | null>;
  documentType: FormControl<IdAndNameResponse | null>;
  cashRegister: FormControl<string | null>;
  employee: FormControl<string | null>;
  referenceContent: FormControl<string | null>;
  file: FormControl<FileWithLoading[] | null>;
}

export type DashboardDirection = 'forward' | 'back';
export type DashboardStep = 'firstStep' | 'secondStep' | 'thirdStep' | 'fourthStep' | 'fifthStep';
export type ProcessTableItems = ProcessResponseItems & { isSelected: FormControl<boolean | null> };
export type RecordListItems = FeedbacksRecordsListItems & { isSelected: FormControl<boolean | null> };
export type CompensationsListItems = ProcessResponseItems & { isSelected: FormControl<boolean | null> };
export type ChatListItems = ChatResponse & { active: boolean };

export enum DashboardStepEnum {
  FirstStep = 'firstStep',
  SecondStep = 'secondStep',
  ThirdStep = 'thirdStep',
  FourthStep = 'fourthStep',
  FifthStep = 'fifthStep',
}

export type DashboardHeaderIds = {
  organizationId?: string | null;
  employerId?: string | null;
  departmentId?: string | null;
};

export type DocumentTypesEmployerType = {
  employer_deposition: string | DocumentTypes,
  other: string | DocumentTypes,
  employer_poa: string | DocumentTypes,
  protocol_poa: string | DocumentTypes,
  authorization_protocol: string | DocumentTypes,
  employer_signature: string | DocumentTypes,
};

export const DocumentTypesConstEmployer: DocumentTypesEmployerType = {
  employer_deposition: 'EmployerDeposition' as DocumentTypes,
  other: 'Other' as DocumentTypes,
  employer_poa: 'EmployerPoa' as DocumentTypes,
  protocol_poa: 'ProtocolPoa' as DocumentTypes,
  authorization_protocol: 'AuthorizationProtocol' as DocumentTypes,
  employer_signature: 'EmployerSignature' as DocumentTypes,
};

export enum DocumentTypesEnumEmployer {
  EmployerDeposition = 'הצהרת מעסיק',
  Other = 'אחר',
  EmployerPoa = 'יפוי כח',
  ProtocolPoa = 'פרוטוקול ויפוי כח',
  AuthorizationProtocol = 'פרוטוקול מורשה חתימה',
  EmployerSignature = 'חתימת מעסיק (תמונה)',
}

export enum DashboardDirectionEnum {
  Forward = 'forward',
  Back = 'back'
}

export interface DashboardHeaderBackgroundClass {
  ['bgNeutrals950']: boolean;
  ['bgBrightTurquoise500']: boolean;
  ['bgNeutrals100']: boolean;
}

export interface DashboardHeaderCountClass {
  ['acceptBorderedIcon']: boolean;
  ['secondRoundedIcon']?: boolean;
  ['secondRoundedFillIcon']?: boolean,
  ['thirdRoundedIcon']?: boolean;
  ['thirdRoundedFillIcon']?: boolean,
  ['fourthRoundedIcon']?: boolean;
  ['fourthRoundedFillIcon']?: boolean,
}

export interface DashboardTriangleClass {
  ['blackTriangleLeft']: boolean;
  ['brightTurquoiseTriangleLeft']: boolean;
  ['brightTurquoiseTriangleLeftDisabled']: boolean;
}

export interface DashboardVerticalLineChatColor {
  ['bgPumpkin500']: boolean;
  ['bgRose600']: boolean;
  ['bgBrightTurquoise500']: boolean,
  ['bgBrightTurquoise600']: boolean;
  ['bgBlueBase600']: boolean,
  ['bgYellowWarning400']: boolean;
}

export interface VerticalMenuItem {
  item: string;
  isActive: boolean;
  itemActive: string;
  itemInactive: string;
}

export interface DashboardDocumentsDownloadFile {
  id: string;
  employerId: string;
}

export interface DashboardDocumentsAddDocument {
  documents: DocumentTypes;
  description: string;
  opswatId: string;
}
