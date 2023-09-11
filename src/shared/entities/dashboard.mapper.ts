import { FormControl, FormGroup } from '@angular/forms';
import {
  DashboardCreateNewChatGroupControls,
  DashboardHeaderGroupControls, DashboardVerticalLineChatColor, VerticalMenuItem,
} from './dashboard.models';

export function dashboardHeaderGroupMapper(): FormGroup<DashboardHeaderGroupControls> {
  return new FormGroup({
    organization: new FormControl(),
    employer: new FormControl(),
    department: new FormControl(),
  });
}

export function dashboardCreateNewChatGroupMapper(): FormGroup<DashboardCreateNewChatGroupControls> {
  return new FormGroup({
    document: new FormControl(),
    documentType: new FormControl(),
    cashRegister: new FormControl(),
    employee: new FormControl(),
    referenceContent: new FormControl(),
    file: new FormControl(),
  });
}

export function setLineColorClass(text: string | undefined): DashboardVerticalLineChatColor {
  return {
    'bgPumpkin500': text === 'היזונים' || text === 'אסמכתאות/ גבייה',
    'bgRose600': text === 'מכתב/ הודעה מהקופה' || text === 'דוחות ברמת מעסיק',
    'bgBrightTurquoise500': text === 'מהקופה',
    'bgBrightTurquoise600': text === 'דוחות ברמת עובד',
    'bgBlueBase600': text === 'מסמכים וטפסים' || text === 'החזר כספים',
    'bgYellowWarning400': text === 'בירור הפקדות בגין עובד' || text === 'כללי',
  };
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
    item: 'compensations',
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