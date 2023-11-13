import {
  AccountType,
  CodeAndNameResponse,
  Comment,
  CriteriaMore,
  FileDataExtResponse,
  FileType,
  PaymentType,
  ProcessType,
  ProductType,
  ReasonRefund,
  StatusFeedback,
  StatusFileFeedback,
  StatusGroupThing,
  StatusProcess,
  TransmissionProductAuto,
  UpdateFileType,
} from './common.models';
import { ApiProductsFullCompanyBankAccount } from './products.models';

export interface ProcessesParameters {
  year?: string,
  month?: string,
  location?: boolean,
  page?: string,
  limit?: string,
  organizationId?: string,
  employerId?: string,
  departmentId?: string,
}

export interface ProcessResponse {
  items?: Array<ProcessResponseItems>;
  lastPage?: number;
  total?: number;
}

export interface ProcessResponseItems {
  account_type?: AccountType;
  allowed_change_groups?: string;
  allowed_fix_errors?: string;
  allowed_show_exceptions?: string;
  created_at?: string;
  id?: number;
  name?: string;
  status?: string;
  type?: ProcessType;
  total?: number;
  date?: number;
  error_details?: string;
  transmit_date?: string;
  payment_instructions?: boolean;
  is_references?: boolean;
  status_feedback?: StatusFeedback;
  is_exceptions?: boolean;
  is_relevant?: boolean;
  department_name?: string;
  dep_id?: number;
  organization_name?: string;
  organization_id?: number;
  employer_name?: string;
  employer_id?: number;
  operator_name?: string;
  payment_instructions_auto?: TransmissionProductAuto;
  transmission_product_auto?: TransmissionProductAuto;
  status_process?: StatusProcess;
  is_comment?: boolean;
  count_inquiries?: number;
  is_feedback_send?: boolean;
  type_upload?: number;
}

export interface ProcessesDownloadPaymentsInstructionBody {
  filesList?: Array<number>;
  isSendMax?: boolean;
  processId?: number;
  department_id?: string;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
}

export interface ApiProcessesUnlockProcessFilesCriteria {
  isCheckAll?: boolean;
  page?: number;
  limit?: number;
  department_id?: number;
  processId?: number;
}

export interface CriteriaProcess {
  page?: number;
  limit?: number;
  department_id?: number;
  processId?: number;
}

export interface DownloadPaymentsInstructionResponse {
  result?: Array<FileDataExtResponse>;
}

export interface ProcessIdDeleteParameters {
  processId: number,
  departmentId?: string,
}

export interface ProcessIdDeleteRefDocumentBody {
  filename?: string;
  department_id?: string;
}

export interface ProcessesSendPaymentsInstructionBody {
  processId?: number;
  filesList?: Array<number>;
  isSendMax?: boolean;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
  recipient?: Array<string>;
}

export interface ProcessesChangeFileToNegativeBody {
  mtbs?: Array<number>;
  department_id?: number;
  comment?: number;
  criteria?: ApiProcessesChangeFileToNegativeCriteria;
}

export interface ApiProcessesChangeFileToNegativeCriteria {
  year?: number;
  additionalProperties?: CriteriaMore;
}

export interface ProcessesCheckIsDateBody {
  processId?: number;
  department_id?: string;
}

export interface CheckIsDateResponse {
  is_date?: boolean;
  block_sum?: number;
  num_file?: number;
  code?: number;
}

export interface ProcessesFilesListGetParameters {
  departmentId?: string;
  processId?: string;
  isReference?: boolean;
  isCheckAll?: boolean;
  page?: string;
  limit?: string;
}
export interface ProcessDetails {
  id?: string;
  name?: string;
  status?: string | null;
  type?: string;
  total?: number;
  date?: string;
  records_count?: number;
  mtbs_count?: number;
  groups_count?: number;
  department_name?: string;
  employer_name?: string;
  employer_id?: number;
  employer_identifier?: string;
  percent?: number;
  sent_status?: string;
  count?: number;
  dep_id?: number;
  is_deposition?: boolean;
  error?: string;
  is_allowed_transmission_product_auto?: string;
  is_allowed_references_auto?: string;
  is_allowed_payment_instructions?: string;
  is_allowed_feedback_auto?: string;
  error_details?: string;
  organization_id?: number;
  payment_instructions?: boolean;
  is_reference?: boolean;
  is_null_company?: boolean;
  is_exceptions?: boolean;
  count_employee?: number;
  allowed_show_exceptions?: boolean;
  allowed_fix_errors?: boolean;
  allowed_change_groups?: boolean;
  is_feedback_send?: boolean;
  account_type?: any

}
export interface FilesListGetResponse {
  items?: Array<FilesListGetResponseItems>;
  total?: number;
  lastPage?: number;
}

export interface FilesListGetResponseItems {
  file_type?: FileType;
  file_id?: number;
  company_name?: string;
  employer_products?: Array<CodeAndNameResponse>;
  product_type?: ProductType;
  product_code?: string;
  paid_account_number?: string;
  is_primary?: boolean;
  payment_identifier?: string;
  payment_additional_info?: ApiProductsFullCompanyBankAccount;
  payment_date?: string;
  payment_type?: PaymentType;
  file_total?: string;
  group_id?: number;
  status_sent?: StatusFileFeedback;
  status?: StatusGroupThing;
  ref_path?: string;
  comment?: string;
  comments?: Array<Comment>;
  is_relevant?: boolean;
  in_process?: boolean;
  request_open?: string;
}

export interface ProcessIdDownloadFileGetParameters {
  processId: number;
  departmentId?: string;
}

export interface ProcessIdDownloadFileGetResponse {
  blobs?: Array<string>;
  fileNames?: Array<string>;
  ok?: boolean;
  code?: number;
}

export interface ProcessIdDownloadRefDocumentBody {
  filename?: string;
  department_id?: string;
}

export interface ProcessIdDownloadRefDocumentResponse {
  blob?: string;
  ok?: boolean;
  code?: number;
}

export interface ProcessIdGetRefDocumentResponse {
  file_name?: string;
  file_type?: string;
  file_date?: string;
}

export interface ProcessIdUploadsRefBody {
  opswatIds?: Array<string>;
  department_id?: string;
}

export interface ProcessesIdAuthorizationReceiptCertificateBody {
  department_id?: string;
}

export interface ProcessesIdAuthorizationReceiptCertificateResponse {
  ok?: boolean;
  transmission_auto?: boolean;
  success_transmission?: boolean;
  code?: number;
}

export interface ProcessesSetRecordsBody {
  filesList?: Array<number>;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
  processId?: number;
}

export interface ApiProcessesUnlockProcessFilesCriteria {
  isCheckAll?: boolean;
  additionalProperties?: CriteriaProcess;
}

export interface ProcessesSetRecordsResponse {
  reason_refund?: boolean;
  group_things_ids?: Array<number>;
  num_file?: number;
  sum?: number;
  sent?: boolean;
  error_details?: string;
  is_null_company?: boolean;
  status?: StatusProcess;
  code?: number;
}

export interface ProcessesTransmitBody {
  processId?: number;
  department_id?: string;
}

export interface ProcessesUnlockProcessFilesBody {
  filesList?: Array<number>;
  is_unlock?: boolean;
  comment?: string;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
  processId?: number;
}

export interface ProcessesUnlockProcessFilesResponse {
  success?: string;
  authorized?: boolean;
  part?: boolean;
}

export interface ProcessesUpdateDateAndReferenceBody {
  file_id?: Array<string>;
  type?: boolean;
  criteria?: CriteriaUpdateProcess;
  opswatIds?: Array<string>;
  deposit_date?: string;
}

export interface CriteriaUpdateProcess {
  page?: number;
  limit?: number;
  organizationId?: string;
  employerId?: number;
  departmentId?: string;
  location?: boolean;
  year?: string;
}

export interface UpdateDateAndReferenceResponse {
  message?: string;
  ok?: boolean;
  code?: number;
}

export interface ProcessesUpdateBody {
  file_id?: Array<number>;
  params?: any;
  type?: UpdateFileType;
  criteria?: CriteriaProcess;
  processId?: string;
}

export interface ProcessesUpdateProcessBody {
  file_id?: Array<string>;
  type?: boolean;
  criteria?: CriteriaUpdateProcess;
}

export interface ProcessesUpdateReasonRefundBody {
  filesList?: Array<number>;
  reason?: ReasonRefund;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
}

export interface UpdateReasonRefundResponse {
  success?: string;
  authorized?: boolean;
  part?: boolean;
  code?: number;
}

export interface ProcessesUpdateTypeProcessBody {
  filesList?: Array<string>;
  type?: number;
  criteria?: CriteriaUpdateProcess;
}
