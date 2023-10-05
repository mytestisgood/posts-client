import { FormControl } from '@angular/forms';
import {
  ActivationEnd,
  ActivationStart,
  ChildActivationEnd,
  ChildActivationStart,
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationSkipped,
  NavigationStart,
  ResolveEnd,
  ResolveStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  RoutesRecognized,
  Scroll,
} from '@angular/router';

export const TOKEN: string = 'token';
export const CURRENT_USER = 'currentUser';
export const IS_LOGGED_IN: string = 'isLoggedIn';
export const DEPARTMENT_ID: string = 'departmentId';
export const SPECIAL_HEADER_TOKEN: string = 'specialHeaderToken';
export const emailValidatorPattern: string = '^(?!^-)[\\w-]+(?:[\\.-][\\w-]+)*(?:[\\.+][\\w-]+)*@' +
  '\\w+(?:[\\.-]\\w+)*(?:\\.[A-Za-z]{2,4})+$';
export const israelMobilePhoneValidatorPattern: string = '^05\\d([-]{0,1})\\d{7}$';

export type FileWithLoading = File & { isLoading: boolean, isUploaded: boolean };

export type NavigationEvent = NavigationStart | NavigationEnd | NavigationCancel | NavigationError |
  RoutesRecognized | GuardsCheckStart | GuardsCheckEnd | RouteConfigLoadStart | RouteConfigLoadEnd |
  ChildActivationStart | ChildActivationEnd | ActivationStart | ActivationEnd | Scroll | ResolveStart |
  ResolveEnd | NavigationSkipped;

export interface DialogConfig<T = unknown> {
  header?: string;
  data?: T;
  dismissible?: boolean;
  fullscreen?: boolean;
  size?: string;
  dropdown?: boolean;
  scrollable?: boolean;
  hostStyles?: string;
  showCloseButton?: boolean
}

export interface FileUploadStatusAndId {
  status: boolean;
  id: string | null;
}

export interface DashboardDownloadDocumentsModel {
  title: string,
  image: string,
  name: string,
  isSelected: boolean,
  type?: string,
}

export enum SpecialHeaderTokenEnum {
  Show = 'show',
  Hidden = 'hidden',
}

export interface LeadsForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
}