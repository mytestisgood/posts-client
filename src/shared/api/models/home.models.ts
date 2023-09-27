import { ProductType, StatusProcess } from './common.models';

export interface GetTypeLoadParameters {
  organizationId?: string;
  token?: string;
}

export interface CompensationReportGetParameters {
  type?: string;
  startDate?: string;
  endDate?: string;
  salaryMonth?: boolean;
  organizationId?: string;
  employerId?: string;
  departmentId?: string;
  token?: string;
}

export interface CompensationReportGetResponse {
  message?: string;
  reportsCompensation?: Array<ReportsCompensationItems>;
  code?: number;
}

export interface ReportsCompensationItems {
  created_at?: string;
  employee_first_name?: string;
  employee_identifier?: string;
  employee_last_name?: string;
  product_type?: ProductType;
}

export interface EmployerReportParameters {
  token?: string;
  reportsEmployerReportBody?: EmployerReportBody;
}

export interface EmployerReportBody {
  employerId?: string;
  organizationId?: string;
  startDate?: string;
  endDate?: string;
  salaryMonth?: boolean;
}

export interface EmployerReportResponse {
  message?: string;
  reportsData?: ReportsData;
  code?: number;
}

export interface ReportsData {
  processes?: Array<ReportsDataProcesses>;
  compensation_open?: number;
  compensation_close?: number;
  files?: number;
  files_loading?: number;
  files_transmitted?: number;
  employees_zero_count?: number;
  employees_no_zero_count?: number;
  file_feedback_a_failed?: number;
  file_not_defrayed?: number;
  file_partially_paid?: number;
  file_fully_defrayed?: number;
  mtb_defrayed?: number;
  mtb_not_defrayed?: number;
}

export interface ReportsDataProcesses {
  id?: number;
  name?: string;
  created_at?: string;
  status_process?: StatusProcess;
  department_id?: number;
  employer_id?: number;
  total?: number;
  date?: string;
  employer_name?: string;
}

export interface FeedbackEmployerReportGetParameters {
  year?: string;
  month?: string;
  status?: string;
  organizationId?: string;
  employerId?: string;
  token?: string;
}

export interface FeedbackEmployerReportGetResponse {
  message?: string;
  reportsFeedback?: Array<string>;
  code?: number;
}