export interface MenoraGetParameters {
  organizationId?: string;
  employerId?: string;
  departmentId?: string;
  page?: string;
  limit?: string;
}

export interface MenoraGetResponse {
  items?: Array<MenoraGetResponseItems>;
  total?: number;
  lastPage?: number;
  code?: number;
}

export interface MenoraGetResponseItems {
  id?: number;
  employer_name?: string;
  employee_name?: string;
  identifier?: string;
  product_name?: string;
  product_code?: number;
}