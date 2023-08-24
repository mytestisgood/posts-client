import { FormControl, FormGroup } from '@angular/forms';
import {
  DashboardChatAddFileGroupControls,
  DashboardHeaderGroupControls, DashboardVerticalLineChatColor,
} from './dashboard.models';

export function dashboardHeaderGroupMapper(): FormGroup<DashboardHeaderGroupControls> {
  return new FormGroup({
    organization: new FormControl(),
    employer: new FormControl(),
    department: new FormControl(),
  });
}

export function dashboardChatAddFileGroupMapper(): FormGroup<DashboardChatAddFileGroupControls> {
  return new FormGroup({
    document: new FormControl(),
    documentType: new FormControl(),
    cashRegister: new FormControl(),
    employee: new FormControl(),
    referenceContent: new FormControl(),
    file: new FormControl(),
  });
}

export function setLineColorClass(text: string): DashboardVerticalLineChatColor {
  return {
    'bgPumpkin500': text === 'היזונים' || text === 'אסמכתאות/ גבייה',
    'bgRose600': text === 'מכתב/ הודעה' || text === 'דוחות ברמת מעסיק',
    'bgBrightTurquoise500': text === 'מהקופה',
    'bgBrightTurquoise600': text === 'דוחות ברמת עובד',
    'bgBlueBase600': text === 'מסמכים וטפסים' || text === 'החזר כספים',
    'bgYellowWarning400': text === 'בירור הפקדות בגין עובד' || text === 'כללי',
  };
}