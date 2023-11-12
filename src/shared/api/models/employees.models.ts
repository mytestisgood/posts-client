export interface GetEmployeesListGetParameters {
  organizationId?: string;
  employerId?: string;
  departmentId?: string;
  index?: string;
}

export interface GetBankDetailsSmartiParameters {
  department_id?: string
}

export interface GetBankDetailsSmartiResponse {
  bank_details?: BankDetails,
  code?: number,
}

export interface BankDetails {
  number?: string,
  branch_number?: string,
  bank_name?: string,
  name?: string
}
