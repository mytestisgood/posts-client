export const emailValidatorPattern: string = '^(?!^-)[\\w-]+(?:[\\.-][\\w-]+)*(?:[\\.+][\\w-]+)*@' +
  '\\w+(?:[\\.-]\\w+)*(?:\\.[A-Za-z]{2,4})+$';

export type FileWithLoading = File & { isLoading: boolean, isUploaded: boolean };
