import { FormControl } from '@angular/forms';
import { InlineResponse2006Items, StatusChat } from '@shared/api';
import { FileWithLoading } from './common.models';

export interface DashboardHeaderGroupControls {
  organization: FormControl<string | number | null>;
  employer: FormControl<string | number | null>;
  department: FormControl<string | number | null>;
}

export interface DashboardChatAddFileGroupControls {
  document: FormControl<string | null>;
  documentType: FormControl<string | null>;
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

export interface DashboardChatItem {
  status?: StatusChat;
  type: string;
  smallHeader: string;
  title: string;
  lastMessageText: string;
  date: string;
  id: number;
  active: boolean;
  messagesItems: DashboardMessagesItem[];
}

export type DashboardDirection = 'forward' | 'back';

export type DashboardStep = 'firstStep' | 'secondStep' | 'thirdStep' | 'fourthStep' | 'fifthStep';

export type ProcessTableItems = InlineResponse2006Items & { isSelected: boolean };

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

export const verticalMenuArray: VerticalMenuItem[] = [
  {
    item: 'home',
    isActive: true,
    itemActive: 'url("/assets/svg/active-home-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-home-icon.svg")',
  },
  {
    item: 'processes',
    isActive: false,
    itemActive: 'url("/assets/svg/active-process-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-process-icon.svg")',
  },
  {
    item: 'employer',
    isActive: false,
    itemActive: 'url("/assets/svg/active-employer-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-employer-icon.svg")',
  },
  {
    item: 'balance',
    isActive: false,
    itemActive: 'url("/assets/svg/active-balance-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-balance-icon.svg")',
  },
  {
    item: 'documents',
    isActive: false,
    itemActive: 'url("/assets/svg/active-documents-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-documents-icon.svg")',
  },
  {
    item: 'cash-register',
    isActive: false,
    itemActive: 'url("/assets/svg/active-cash-register-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-cash-register-icon.svg")',
  },
  {
    item: 'inquiries',
    isActive: false,
    itemActive: 'url("/assets/svg/active-inquiries-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-inquiries-icon.svg")',
  },
  {
    item: 'shield',
    isActive: false,
    itemActive: 'url("/assets/svg/active-shield-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-shield-icon.svg")',
  },
  {
    item: 'download-documents',
    isActive: false,
    itemActive: 'url("/assets/svg/active-download-documents-icon.svg")',
    itemInactive: 'url("/assets/svg/inactive-download-documents-icon.svg")',
  },
];

export const chatItems: DashboardChatItem[] = [
  {
    type: 'סגור',
    smallHeader: 'היזונים',
    title: 'Shishi Gear Jaffa Ltd. - Sezi Mizrachi',
    lastMessageText: 'Hi Jenny, I emailed you a breakdown of debts in general pension.',
    date: '25-06-2023',
    id: 1,
    active: false,
    messagesItems: [{
      date: '23-08-2023',
      messages: [
        {
          title: 'אני',
          text: 'היי סזי. קיבלנו חוב ריבית פיגורים בגין הפקדות לקרן פנסיה. בבקשה לבדיקתך. תודה גני',
          time: '14:29',
          isUserMessage: true,
          haveFile: true,
          file: 'example.pdf',
        }, {
          title: 'סזי מזרחי',
          text: 'היי גני , בבדיקה מול כלל פנסיה',
          time: '14:29',
          isUserMessage: false,
          haveFile: false,
          file: null,
        },
      ],
    }, {
      date: '22-08-2023',
      messages: [
        {
          title: 'אני',
          text: 'היי סזי. קיבלנו חוב ריבית פיגורים בגין הפקדות לקרן פנסיה. בבקשה לבדיקתך. תודה גני',
          time: '14:29',
          isUserMessage: true,
          haveFile: true,
          file: 'example.pdf',
        }, {
          title: 'סזי מזרחי',
          text: 'היי גני , בבדיקה מול כלל פנסיה',
          time: '14:29',
          isUserMessage: false,
          haveFile: false,
          file: null,
        },
      ],
    }],
  }, {
    type: 'פתוח',
    smallHeader: 'מכתב/ הודעה',
    title: 'Shishi Gear Jaffa Ltd. - Sezi Mizrachi',
    lastMessageText: 'Hi Jenny, I emailed you a breakdown of debts in general pension.',
    date: '25-06-2023',
    id: 2,
    active: false,
    messagesItems: [{
      date: '21-08-2023',
      messages: [
        {
          title: 'test2',
          text: 'test2 test2 test2 test2',
          time: '14:29',
          isUserMessage: false,
          haveFile: false,
          file: null,
        }, {
          title: 'test3 test3',
          text: 'test3 test3 test3 test3 test3 test3 test3',
          time: '14:29',
          isUserMessage: true,
          haveFile: false,
          file: null,
        },
      ],
    }, {
      date: '20-08-2023',
      messages: [
        {
          title: 'test4',
          text: 'test4 test4 test4 test4 test4',
          time: '14:29',
          isUserMessage: true,
          haveFile: true,
          file: 'example.pdf',
        }, {
          title: 'test5',
          text: 'test5 test5 test5 test5 test5 test5',
          time: '14:29',
          isUserMessage: false,
          haveFile: false,
          file: null,
        },
      ],
    }],
  }, {
    type: 'בטיפול',
    smallHeader: 'מהקופה',
    title: 'Shishi Gear Jaffa Ltd. - Sezi Mizrachi',
    lastMessageText: 'Hi Jenny, I emailed you a breakdown of debts in general pension.',
    date: '25-06-2023',
    id: 3,
    active: false,
    messagesItems: [{
      date: '23-08-2023',
      messages: [
        {
          title: 'test123123',
          text: 'test123123י',
          time: '14:29',
          isUserMessage: true,
          haveFile: true,
          file: 'example.pdf',
        }, {
          title: 'test123123213123',
          text: 'test123123213123 test123123213123 test123123213123',
          time: '14:29',
          isUserMessage: false,
          haveFile: false,
          file: null,
        },
      ],
    }],
  }, {
    type: 'פתוח',
    smallHeader: 'מסמכים וטפסים',
    title: 'Shishi Gear Jaffa Ltd. - Sezi Mizrachi',
    lastMessageText: 'Hi Jenny, I emailed you a breakdown of debts in general pension.',
    date: '25-06-2023',
    id: 4,
    active: false,
    messagesItems: [],
  },
];
