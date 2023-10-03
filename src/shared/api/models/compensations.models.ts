import {
  CodeError,
  CodeErrorFile,
  CommentsItem,
  EventCode,
  FeedbackLevel,
  ProductType,
  ReportingType,
  SendingMethod,
  StatusCompensation,
} from './common.models';

export interface CompensationsDownloadExampleFileBody {
  comments?: string;
}

export interface CompensationsGetParameters {
  departmentId?: string;
  employerId?: string;
  organizationId?: string;
  eventCode?: EventCode;
  page?: string;
  limit?: string;
}

export interface CompensationsGetResponse {
  items?: Array<CompensationsItems>;
}

export interface CompensationsItems {
  id?: number;
  created_at?: string;
  updated_at?: string;
  user_id?: number;
  employer_name?: string;
  employer_id?: number;
  department_name?: string;
  department_id?: number;
  employee_name?: string;
  is_file?: boolean;
  identifier?: string;
  company_name?: string;
  company_id?: number;
  alidity_date?: string;
  sending_method?: SendingMethod;
  product_type?: ProductType;
  projected_balance?: number;
  reported_balance?: number;
  portal_balance?: number;
  status?: StatusCompensation;
  contents?: string;
  closed_at?: string;
  files?: Array<string>;
  code_error?: CodeError;
  error_details?: string;
  code_error_file?: CodeErrorFile;
  error_details_file?: string;
  error_sent_failed?: string;
  feedback_level?: FeedbackLevel;
  answering_manufacturer?: string;
  username?: string;
  reporting_type?: ReportingType;
  has_by_safebox?: boolean;
  has_file_feedback?: boolean;
  xml_name?: string;
  extend_clearing?: string;
  inquiries?: Array<string>;
  comments?: Array<CommentsItem>;
  name?: string;
  num_clearing?: number;
  product_code?: string;
}

export interface ApiCompensationsBody {
  comments?: string;
  company0?: string;
  department_id?: string;
  employee?: number;
  employer_id?: number;
  event_code?: EventCode;
  has_all?: boolean;
  product_type0?: ProductType;
  products_company?: Array<ApiCompensationsProductsCompany>;
  projected_balance?: number;
  validity_date?: string;
}

export interface ApiCompensationsProductsCompany {
  company_id?: string;
  product_type?: ProductType;
}

export interface CompensationSendPostResponse {
  message?: string;
  list_exceptions?: Array<string>;
  code?: number;
}

export interface CompensationsSendBody {
  compensation_ids?: Array<string>;
  criteria?: ApiCompensationsUpdateSentStatusCriteria;
}

export interface ApiCompensationsUpdateSentStatusCriteria {
  organization_id?: string;
  employer_id?: number;
  department_id?: string;
  event_code?: EventCode;
  page?: number;
  limit?: number;
}

export interface CompensationsUpdateSentStatusBody {
  compensation_ids?: Array<string>;
  criteria?: ApiCompensationsUpdateSentStatusCriteria;
}

export interface CompensationsEmployeeIdCompanyEmployeeGetParameters {
  employeeId: number;
  cId?: string;
  eId?: string;
}