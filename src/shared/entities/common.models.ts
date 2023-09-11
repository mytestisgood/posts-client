export const SPECIAL_HEADER_TOKEN: string = 'specialHeaderToken';
export const emailValidatorPattern: string = '^(?!^-)[\\w-]+(?:[\\.-][\\w-]+)*(?:[\\.+][\\w-]+)*@' +
  '\\w+(?:[\\.-]\\w+)*(?:\\.[A-Za-z]{2,4})+$';

export type FileWithLoading = File & { isLoading: boolean, isUploaded: boolean };

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