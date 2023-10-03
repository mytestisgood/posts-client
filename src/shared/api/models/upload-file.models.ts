export interface UploadFileGetParameters {
  departmentId: string,
  processId: string,
}

export interface ProcessesUploadFileBody {
  departmentId?: string;
  isDirect?: boolean;
  month?: string;
  processName?: string;
  year?: string;
  isEmployer?: boolean;
  isDepartmentLink?: boolean;
  opswatIds?: Array<string>;
}

export interface UploadFilePostResponse {
  processId?: string;
  date?: string;
  allowd?: boolean;
}