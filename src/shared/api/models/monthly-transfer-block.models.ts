import {
  ClauseType,
  CriteriaBase,
  DepositStatus,
  DepositType,
  EmployeeStatus,
  FileType,
  IdAndNameResponse,
  ProcessType,
  ProductType,
  ReasonRefund,
  SalaryLevel,
  StatusEmployeeFeedBack,
} from './common.models';
import { ApiProcessesUnlockProcessFilesCriteria, CriteriaProcess } from './processes.models';

export interface MtbCreateOrUpdateMtbGroupParameters {
  token?: string;
  mtbCreateOrUpdateMtbGroupBody?: MtbCreateOrUpdateMtbGroupBody;
}

export interface MtbCreateOrUpdateMtbGroupBody {
  ids?: Array<number>;
  type?: ReasonRefund;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
  bank_account_id?: number;
  product_id?: number;
  group_name?: string;
  confirmation?: number;
}

export interface MtbCreateOrUpdateMtbGroupResponse {
  success?: boolean;
  message?: string;
  groups_count?: number;
  mtbs_count?: number;
  code?: number;
}

export interface MtbEntityGetParameters {
  processId?: string;
  departmentId?: string;
  recordsId?: string;
  token?: string;
}

export interface MtbEntityGetResponse {
  employees?: Array<IdAndNameResponse>;
  products?: Array<IdAndNameResponse>;
  employer_products?: Array<IdAndNameResponse>;
  code?: number;
}

export interface MtbGetParameters {
  processId?: string;
  departmentId?: string;
  recordsId?: string;
  limit?: string;
  page?: string;
  token?: string;
}

export interface MtbGetResponse {
  items?: Array<MtbGetResponseItem>;
  total?: number;
  lastPage?: number;
  code?: number;
}

export interface MtbGetResponseItem {
  id?: number;
  salary_month?: string;
  updated_at?: string;
  deposit_type?: DepositType;
  salary_level?: SalaryLevel;
  reason_refund?: ReasonRefund;
  is_employee_declaration?: boolean;
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
  employee_id?: number;
  department_id?: number;
  first_name?: string;
  last_name?: string;
  personal_id?: string;
  employer_product_code?: string;
  employer_company_id?: number;
  employer_product_name?: string;
  section14?: boolean;
  employer_product_type?: ProductType;
  product_code?: number;
  product_id?: number;
  company_id?: number;
  company_name?: string;
  sum_ipi_employer?: number;
  status?: StatusEmployeeFeedBack;
  file_type?: FileType;
  defrayal_error?: Array<string>;
  transfer_clause?: Array<TransferClause>;
  process_type?: ProcessType;
  is_change?: boolean;
}

export interface TransferClause {
  clause_type?: ClauseType;
  transfer_sum?: number;
  transfer_percent?: number;
  exempt_sum?: number;
  id?: number;
}

export interface MtbGroupEmployeesBody {
  ids?: Array<number>;
  criteria?: CriteriaProcess;
}

export interface MtbGroupHistoryProcessIdGetParameters {
  processId: string;
  departmentId?: string;
}

export interface MtbGroupHistoryProcessIdGetResponse {
  id?: number;
  employee_chr_id?: number;
  original_employer_product_id?: number;
  original_group_name?: string;
  original_group_id?: number;
  current_group_id?: number;
  current_group_name?: string;
  employee_name?: string;
  identifier?: string;
  product_code?: number;
  product_name?: string;
  employer_product_code?: number;
  employer_product_name?: string;
  current_product_name?: string;
  current_product_code?: number;
  current_employer_product_name?: string;
  current_employer_product_code?: number;
}

export interface MtbUploadEmployeeDeclarationBody {
  departmentId?: string;
  mtbIds?: Array<number>;
  criteria?: ApiMtbUploadEmployeeDeclarationCriteria;
}

export interface ApiMtbUploadEmployeeDeclarationCriteria {
  departmentId?: string;
  processId?: string;
  recordsId?: string;
  additionalProperties?: CriteriaBase;
}