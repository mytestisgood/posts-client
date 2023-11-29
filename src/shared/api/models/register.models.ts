export interface EmployersCreateEmployerOutBody {
  company_name?: string;
  identifier?: string;
  user_name?: string;
  phone?: string;
  email?: string;
  employer_id?: string;
  user_id?: string;
}

export interface EmployersCreateUserOutBody {
  user_name?: string;
  phone?: string;
  identifier?: string;
  email?: string;
  departmentId?: number;
}
export interface EmployersCreatePaymentOutBody {
  departmentId?: string;
  payBySmarti?: boolean;
}
export interface EmployersUpdatePaymentOutBody {
  branchId?: string;
  departmentId?: string;
  accountNumber?: string;
}


export interface CreateEmployerOutResponse {
  userId?: string;
  message?: string;
  token?: string;
  departmentId?: string;
  employerId?: string;
  code?: number;
}

export interface RegisterParameters {
  password?: string;
  isFromSignIn?: boolean;
}

export interface RegisterResponse {
  code?: number;
  message?: string;
  token?: string;
}

export interface SendEmailUserContinueProcessParameters {
  step?: string;
  email: string | null;
}
export interface SendEmailUserContinueProcessResponse {
  message?: string;
}
