export type AccountType = 'max' | 'company' | 'we';
export type ClauseType = 'compensation' | 'employee_benefits' | 'employer_benefits' | 'self_employeed_benefits' | 'ipi_employee' | 'ipi_employer' | 'other_employee' | 'other_employer';
export type CodeError = '100 invalid_id_technical_level' | '102 no_document_attached' | '105 other' | '110 no_initial_feedbackA' | '111 no_manufacturer_response' | '117 information_ 9201_not_received' | '118 Request_9201_close' | '119 no_final_feedback_received' | '120 monthly_feedback_not_accepted' | '121 no_annual_summaries' | '122 request_for_deposit_intentionally_closed_by_clearing_house' | '123 no_retirement_report_received' | '124 product_request_information_not_received_from_supplier_month' | '125 different_conflicting_responses_received_same_manufacturer_request' | '126 no_weekly_feedback_received';
export type CodeErrorFile = 'invalid_file_name' | 'file_unreadable' | 'invalid_xml_structure' | 'primary_hierarchy_invalid_file' | 'ok_receive_file_level_error_message' | 'amount_records_not_appropriate_review_entry' | 'total_provision_not_appropriate_closing_record' | 'monthly_amount_files_greater_senders' | 'file_date_early' | 'file_date_too_early' | 'future_file_date' | 'totals_not_match_the_report' | 'empty' | 'accepting_valid_file' | 'amount_feedback_records_not_appropriate_file_answered' | 'zip_file_not_opened/unreadable';
export type ConnectType = 'sms' | 'email';
export type DepositStatus = 'share_holder' | 'self_employeed' | 'wage_worker';
export type DepositType = 'regular' | 'singular' | 'convalescence' | 'differences' | 'overtime' | 'convalescence_until' | 'convalescence_above';
export type DocumentTypes = 'other' | 'employer_deposition' | 'employer_poa' | 'authorization_protocol' | 'operation_protocol' | 'contract' | 'customer_details' | 'protocol_poa' | 'employer_signature';
export type EmployeeStatus = 'daily' | 'lacks_payment' | 'seasonal' | 'contract_ended' | 'unpaid_loa' | 'death' | 'provident_fund_changed' | 'department_changed' | 'retired' | 'other' | 'new_employee' | 'contract_ended_compensation' | 'payment_report_future_work_departure' | 'monthly';
export type EventCode = '9303' | '9302' | '9301' | '9300';
export type FeedbackLevel = 'file' | 'record';
export type FileType = 'ongoing_payment' | 'overpay_withdrawal' | 'fix' | 'fix_with_payment' | 'payment_only' | 'withdraw_to_pending' | 'repair_exempt_payments_only';
export type ManualStatus = 'fully_defrayed_manual' | 'fully_defrayed_no_errors' | 'returned_to_employer' | 'no_relevant' | 'in_treatment_operator' | 'in_treatment_employer' | 'in_treatment_myhr' | 'in_treatment_manufacturer';
export type ProductType = 'provident' | 'executive' | 'pension' | 'study';
export type PriorityType = 'standard' | 'conservation' | 'strategic' | 'on_process';
export type ProcessType = 'employer_payment' | 'employer_withdrawal' | 'regular_fix' | 'positive_negative_fix' | 'positive_2_negative_fix' | 'positive_3_negative_fix' | 'direct_employer' | 'manual_payment' | 'unknown';
export type PermissionType = 'read' | 'write' | 'all' | 'employer';
export type PaymentType = 'masav' | 'direct_debit' | 'check' | 'bank_transfer' | 'direct_debit_authorization';
export type ReasonRefund = 'wrong_product_type' | 'wrong_employee_deposit' | 'deposit_month_incorrect' | 'correction_error_calculation_wages' | 'deposit_wrong_management_company' | 'employee_moved_another_provident_fund' | 'collective_agreement' | 'overdose_per_component' | 'acha_premium_excess' | 'overpayment_per_employee_after';
export type ReportingType = 'file_level_deferment' | 'lists_incorrect_entries' | 'confirm_full_integrity_file';
export type Roles = 'super_user' | 'admin' | 'operator' | 'employer' | 'service' | 'service_manager';
export type SalaryLevel = 'overtime' | 'basic_salary' | 'convalescence_allowance' | 'expensesrefund' | 'other';
export type SendingMethod = 'safebox' | 'email' | 'clearing' | 'portal';
export type Src = 'friend' | 'contact_us' | 'pension_settlement' | 'personal_portfolio_manager' | 'form_161' | 'private_area';
export type StatusChat = 'close' | 'in_treatment' | 'open';
export type StatusCompensation = 'feedback_a' | 'feedback_b' | 'open' | 'sent' | 'sent_failed' | 'closed_manually' | 'closed';
export type StatusEmployer = 'moved_association' | 'active' | 'inactive' | 'on_process';
export type StatusEmployeeFeedBack = 'not_sent' | 'sent' | 'fully_defrayed' | 'not_defrayed' | 'partial_affiliation';
export type StatusFeedback = 'fix' | 'error_name' | 'new' | 'not_found' | 'partial' | 'irrelevant';
export type StatusFileFeedback = 'not_sent' | 'sent' | 'sent_failed' | 'feedback_a' | 'feedback_a_failed' | 'partially_paid' | 'fully_paid' | 'paid_failed';
export type StatusProcess = 'loading' | 'error_loading' | 'can_be_processed' | 'feedbacked_once' | 'finished' | 'error_transmiting' | 'loaded_with_errors' | 'partially_transmitted' | 'transmitted' | 'waiting_for_approval';
export type StatusGroupThing = 'not_sent' | 'sent' | 'locked';
export type TransmissionProductAuto = 'link' | 'remainder' | 'no_remainder';
export type TypeLoad = 'manual' | 'file';
export type UpdateFileType = 'date' | 'paymentType' | 'refNumber' | 'depositSum' | 'notRelevant';

export interface ModuleResponse {
  id?: string;
  user_id?: string;
  name?: string;
  permission_type?: PermissionType;
}

export interface SuccessResponse {
  message?: string;
  code?: number;
}

export interface CodeAndNameResponse {
  code?: string;
  name?: string;
}

export interface ResultResponse {
  result?: string;
  code?: number;
}

export interface TokenParameters {
  token: string;
}

export interface CommentsItem {
  id?: number;
  content?: string;
  updated_at?: string;
  username?: string;
}

export interface Comment {
  object_id?: number;
  id?: number;
  content?: string;
  updated_at?: string;
  created_at?: string;
  username?: string;
}

export interface FileDataExeResponse {
  data?: string;
  exe?: string;
  filename?: string;
}

export interface FileDataExtResponse {
  data: string;
  filename: string;
  ext: string;
}

export interface IdAndNameResponse {
  id?: number;
  name?: string;
}

export interface CriteriaBase {
  page?: number;
  limit?: number;
}

export interface CriteriaMore {
  page?: number;
  limit?: number;
  organizationId?: string;
  employerId?: number;
  departmentId?: string;
}

export interface SuccessResponseOnlyMessage {
  message?: string;
}

export interface BooleanResultResponse {
  result?: boolean;
}
