import { FormControl } from '@angular/forms';

export interface DashboardHeaderGroupControls {
  organization: FormControl<string | number | null>;
  employer: FormControl<string | number | null>;
  department: FormControl<string | number | null>;
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