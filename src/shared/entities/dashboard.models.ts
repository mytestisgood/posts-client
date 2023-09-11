import { FormControl } from '@angular/forms';
import {
  InlineResponse20038,
  InlineResponse20039Items,
  InlineResponse2006Items,
  InlineResponse2007,
} from '@shared/api';
import { FileWithLoading } from './common.models';

export interface DashboardHeaderGroupControls {
  organization: FormControl<string | number | null>;
  employer: FormControl<string | number | null>;
  department: FormControl<string | number | null>;
}

export interface DashboardCreateNewChatGroupControls {
  document: FormControl<InlineResponse20038 | null>;
  documentType: FormControl<InlineResponse20038 | null>;
  cashRegister: FormControl<string | null>;
  employee: FormControl<string | null>;
  referenceContent: FormControl<string | null>;
  file: FormControl<FileWithLoading[] | null>;
}

export interface DashboardMessagesItem {
  date: string;
  messages: DashboardMessages[];
}

export interface DashboardMessages {
  title: string;
  text: string;
  time: string;
  isUserMessage: boolean;
  haveFile: boolean;
  file: string | null;
}

export type DashboardDirection = 'forward' | 'back';
export type DashboardStep = 'firstStep' | 'secondStep' | 'thirdStep' | 'fourthStep' | 'fifthStep';
export type ProcessTableItems = InlineResponse2006Items & { isSelected: boolean };
export type RecordListItems = InlineResponse20039Items & { isSelected: boolean };
export type CompensationsListItems = InlineResponse2006Items & { isSelected: boolean };
export type ChatListItems = InlineResponse2007 & { active: boolean };

export enum DashboardStepEnum {
  FirstStep = 'firstStep',
  SecondStep = 'secondStep',
  ThirdStep = 'thirdStep',
  FourthStep = 'fourthStep',
  FifthStep = 'fifthStep',
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
  documents: string;
  description: string;
  opswatId: string;
}
