export interface EmployersCreateEmployerOutBody {
  company_name?: string;
  identifier?: string;
  user_name?: string;
  phone?: string;
  email?: string;
}

export interface EmployersCreateUserOutParameters {
  token: string;
  employersCreateUserOutBody: EmployersCreateUserOutBody;
}

export interface EmployersCreateUserOutBody {
  user_name?: string;
  phone?: string;
  identifier?: string;
  email?: string;
  departmentId?: number;
}
export interface EmployersCreatePaymentOutBody {
  payBySmarti?: boolean;
  branchId?: string;
  departmentId?: string;
  employerId?: string;
  accountNumber?: string;
}

export interface CreateEmployerOutResponse {
  message?: string;
  token?: string;
  departmentId?: string;
  code?: number;
}