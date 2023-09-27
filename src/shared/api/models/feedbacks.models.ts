import {
  ClauseType,
  DepositStatus,
  DepositType,
  EmployeeStatus,
  FileDataExtResponse,
  FileType,
  ManualStatus,
  ProcessType,
  ProductType,
  ReasonRefund,
  SalaryLevel,
  StatusEmployeeFeedBack,
  StatusFeedback,
  StatusFileFeedback,
  StatusProcess,
} from './common.models';
import { CriteriaProcess } from './processes.models';

export interface FeedbacksChangeStatusPostParameters {
  token?: string;
  feedbacksChangeStatusBody?: FeedbacksChangeStatusBody;
}

export interface FeedbacksChangeStatusBody {
  content_type?: string;
  criteria?: FeedbacksChangeStatusBodyCriteria;
  ids?: Array<number>;
  status?: ManualStatus;
}

export interface FeedbacksChangeStatusBodyCriteria {
  page?: number;
  limit?: number;
  organizationId?: string;
  employerId?: number;
  departmentId?: string;
}

export interface FeedbackPostParameters {
  token?: string;
  feedbacksFeedbackBody?: FeedbacksFeedbackBody;
}

export interface FeedbacksFeedbackBody {
  ids?: Array<number>;
  has_type_download?: number;
  type?: string;
  criteria?: CriteriaProcess;
}

export interface FeedbacksPostResponse {
  result?: FileDataExtResponse;
  code?: number;
}

export interface FeedbacksGetTransferParameters {
  mtbId?: string;
  sentGroupId?: StatusFileFeedback;
  statusSentGroup?: string;
  departmentId?: string;
  token?: string;
}

export interface FeedbacksGetTransferResponse {
  clause_type?: ClauseType;
  transfer_sum?: number;
  transfer_percent?: number;
  exempt_sum?: number;
  id?: number;
  predicted_sum?: number;
  predicted_percent?: number;
  guid?: string;
  previous_guid?: string;
  status?: string;
  error_type?: string;
  error_details?: string;
  expected_percent?: number;
  expected_sum?: number;
  exempt?: number;
  percent?: number;
  sum?: number;
  salary_calculated?: number;
  current_provision_rate_aca?: number;
  expected_update_date_aca_tariff?: string;
  future_provision_rate_aca?: number;
  licensee_name?: string;
  licensed_identifier?: string;
  email_address_licensee?: string;
}

export interface FeedbacksProcessIdGetDetailsParameters {
  processId: string;
  departmentId?: string;
  token?: string;
}

export interface FeedbacksProcessIdGetDetailsResponse {
  count_employee?: number;
  fix?: number;
  failed?: number;
  sent?: number;
  not_sent?: number;
  code?: number;
}

export interface FeedbacksRecordsListGetParameters {
  processId?: string;
  employerId?: string;
  departmentId?: string;
  organizationId?: string;
  page?: string;
  limit?: string;
  token?: string;
}

export interface FeedbacksRecordsListGetResponse {
  items?: Array<FeedbacksRecordsListItems>;
  total?: number;
  lastPage?: number;
  other?: FeedbacksRecordsListOther;
  code?: number;
}

export interface FeedbacksRecordsListOther {
  error_types?: Array<number>;
}

export interface FeedbacksRecordsListItems {
  id?: number;
  salary_month?: string;
  updated_at?: string;
  deposit_type?: DepositType;
  salary_level?: SalaryLevel;
  reason_refund?: ReasonRefund;
  path_employee_declaration?: string;
  deposit_status?: DepositStatus;
  salary?: number;
  employee_status?: EmployeeStatus;
  employee_status_start_date?: string;
  work_month_percentage?: number;
  is_relevant?: boolean;
  policy_or_account_number?: string;
  working_days_in_month?: number;
  amount?: number;
  name?: string;
  personal_id?: string;
  product_code?: string;
  product_type?: ProductType;
  company_name?: string;
  company_id?: string;
  process_date?: string;
  deposit_month?: string;
  deposit_date?: string;
  employer_id?: string;
  employer_name?: string;
  department_id?: string;
  inquiries?: Array<string>;
  comments?: Array<Comment>;
  comment?: string;
  reason?: string;
  status?: StatusEmployeeFeedBack;
  manual_status?: ManualStatus;
  sent_file_name?: string;
  group_thing_id?: number;
  file_type?: FileType;
  sent_group_id?: number;
  status_sent_group?: StatusFeedback;
  employee_id?: number;
  file_status?: StatusProcess;
  product_name?: string;
  type?: ProcessType;
}