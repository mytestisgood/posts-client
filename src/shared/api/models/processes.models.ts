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
  token?: string
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

export interface DownloadPaymentsInstructionParameters {
  token?: string,
  processesDownloadPaymentsInstructionBody?: ProcessesDownloadPaymentsInstructionBody
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
  additionalProperties?: CriteriaProcess;
}

export interface CriteriaProcess {
  page?: number;
  limit?: number;
  department_id?: number;
  processId?: number;
}

export interface DownloadPaymentsInstructionResponse {
  result?: FileDataExtResponse;
}

export interface ProcessIdDeleteParameters {
  processId: number,
  departmentId?: string,
  token?: string
}

export interface ProcessIdDeleteRefDocumentPostParameters {
  processId: string;
  token?: string;
  processIdDeleteRefDocumentBody?: ProcessIdDeleteRefDocumentBody;
}

export interface ProcessIdDeleteRefDocumentBody {
  filename?: string;
  department_id?: string;
}

export interface SendPaymentsInstructionParameters {
  token?: string,
  processesSendPaymentsInstructionBody?: ProcessesSendPaymentsInstructionBody
}

export interface ProcessesSendPaymentsInstructionBody {
  processId?: number;
  filesList?: Array<number>;
  isSendMax?: boolean;
  criteria?: ApiProcessesUnlockProcessFilesCriteria;
  recipient?: Array<string>;
}

export interface ChangeFileToNegativeParameters {
  token?: string;
  processesChangeFileToNegativeBody?: ProcessesChangeFileToNegativeBody;
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

export interface CheckIsDateParameters {
  token?: string;
  processesCheckIsDateBody?: ProcessesCheckIsDateBody;
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

export interface EmployerIdGetCommentBroadcastParameters {
  employerId: string;
  token?: string;
}

export interface ProcessesFilesListGetParameters {
  departmentId?: string;
  processId?: string;
  isReference?: boolean;
  isCheckAll?: boolean;
  page?: string;
  limit?: string;
  token?: string;
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
  token?: string;
}

export interface ProcessIdDownloadFileGetResponse {
  blobs?: Array<string>;
  fileNames?: Array<string>;
  ok?: boolean;
  code?: number;
}

export interface ProcessIdDownloadRefDocumentParameters {
  processId: string;
  token?: string;
  processIdDownloadRefDocumentBody?: ProcessIdDownloadRefDocumentBody;
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

export interface ProcessIdGetRefDocumentGeParameters {
  processId: string;
  token?: string;
}

export interface ProcessIdGetRefDocumentResponse {
  file_name?: string;
  file_type?: string;
  file_date?: string;
}

export interface ProcessIdUploadsRefParameters {
  processId: string;
  token?: string;
  processIdUploadsRefBody?: ProcessIdUploadsRefBody;
}

export interface ProcessIdUploadsRefBody {
  opswatIds?: Array<string>;
  department_id?: string;
}

export interface ProcessesIdAuthorizationReceiptCertificateParameters {
  processesId: string;
  token?: string;
  processesIdAuthorizationReceiptCertificateBody?: ProcessesIdAuthorizationReceiptCertificateBody;
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

export interface ProcessesSetRecordsParameters {
  token?: string;
  processesSetRecordsBody?: ProcessesSetRecordsBody;
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

export interface ProcessesTransmitParameters {
  token?: string;
  processesTransmitBody?: ProcessesTransmitBody;
}

export interface UnlockProcessFilesParameters {
  token?: string;
  processesUnlockProcessFilesBody?: ProcessesUnlockProcessFilesBody;
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

export interface UpdateDateAndReferenceParameters {
  token?: string;
  processesUpdateDateAndReferenceBody?: ProcessesUpdateDateAndReferenceBody;
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

export interface ProcessesUpdateParameters {
  token?: string;
  processesUpdateBody?: ProcessesUpdateBody;
}
export interface ProcessesUpdateBody {
  file_id?: Array<number>;
  params?: boolean;
  type?: UpdateFileType;
  criteria?: CriteriaProcess;
  processId?: number;
}

export interface UpdateProcessParameters {
  token?: string;
  processesUpdateProcessBody?: ProcessesUpdateProcessBody;
}

export interface ProcessesUpdateProcessBody {
  file_id?: Array<string>;
  type?: boolean;
  criteria?: CriteriaUpdateProcess;
}

export interface UpdateReasonRefundParameters {
  token?: string;
  processesUpdateReasonRefundBody?: ProcessesUpdateReasonRefundBody;
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

export interface UpdateTypeProcessParameters {
  token?: string;
  processesUpdateTypeProcessBody?: ProcessesUpdateTypeProcessBody;
}

export interface ProcessesUpdateTypeProcessBody {
  filesList?: Array<string>;
  type?: number;
  criteria?: CriteriaUpdateProcess;
}