import { FormControl } from '@angular/forms';
import { DashboardDownloadDocumentsModel } from './common.models';

export const dashboardDownloadDocumentsMapper: DashboardDownloadDocumentsModel[] = [
  {
    title: 'טופס העברה בין קופות מגדל',
    image: 'folder',
    name: 'transfer_form_between_company.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'פורמט תלם',
    image: 'folder',
    name: 'telem.xlsx',
    isSelected: new FormControl(false),
  },
  {
    title: 'תצהיר להחזר כספים',
    image: 'folder',
    name: 'refund_affidavit.docx',
    isSelected: new FormControl(false),
  }, {
    title: 'אישור עובד להחזרת כספים',
    image: 'folder',
    name: 'worker_authorization_refund.docx',
    isSelected: new FormControl(false),
  }, {
    title: 'ייפוי כוח ופרוטוקול',
    image: 'folder',
    name: 'power_attorney_protocol.pdf',
    isSelected: new FormControl(false),
  },
  {
    title: 'הנחיות לדיוח מור',
    image: 'folder',
    name: 'more_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הנחיות לדיוח הראל פנסיה',
    image: 'folder',
    name: 'harel_pension_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הנחיות לדיוח הראל ביטוח',
    image: 'folder',
    name: 'harel_insurance_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הנחיות לדיוח מיטב דש',
    image: 'folder',
    name: 'meitav_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הנחיות לדיוח אלטשולר',
    image: 'folder',
    name: 'alt_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הנחיות לדיוח כלל',
    image: 'folder',
    name: 'clal_reporting_instructions.pdf',
    isSelected: new FormControl(false),
  }, {
    title: 'הרשאה לחיוב חשבון',
    image: 'folder',
    name: 'https://y.fnx.co.il/form/Gviahok',
    isSelected: new FormControl(false),
    type: 'link',
  },
];
