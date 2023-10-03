import { ProductType } from './common.models';

export interface AllProductsGetParameters {
  page?: string;
  limit?: string;
}

export interface AllProductsGetResponse {
  items?: Array<AllProductsGetResponseItems>;
  total?: number;
  lastPage?: number;
  code?: number;
}

export interface AllProductsGetResponseItems {
  id?: string;
  name?: string;
  code?: string;
  type?: string;
  number_a_max?: string;
  is_active?: boolean;
  company_name?: string;
  company_code?: string;
  full_name?: string;
  bank_name?: string;
  bank_number?: string;
  account?: string;
}

export interface ProductsCompaniesGetResponse {
  code?: string;
  id?: string;
  name?: string;
}

export interface ProductsFullCompanyGetResponse {
  id?: string;
  name?: string;
  code?: string;
  product?: Array<ApiProductsFullCompanyProduct>;
}

export interface ApiProductsFullCompanyProduct {
  id?: number;
  name?: string;
  code?: string;
  number_a_max?: number;
  is_active?: boolean;
  company_id?: string;
  company_name?: string;
  company_code?: string;
  type?: ProductType;
  full_name?: string;
  bank_account?: Array<ApiProductsFullCompanyBankAccount>;
}

export interface ApiProductsFullCompanyBankAccount {
  id?: number;
  account_number?: string;
  bank_id?: string;
  branch_id?: string;
  branch_number?: string;
  bank_number?: string;
  is_primary?: boolean;
  is_active?: boolean;
  branch_name?: string;
  bank_name?: string;
  name?: string;
}

export interface ProductsByCompanyGetParameters {
  cId?: string;
  eId?: string;
}

export interface CompensationsEmployeeIdCompanyParameters {
  employeeId: number;
  cId?: string;
  eId?: string;
}