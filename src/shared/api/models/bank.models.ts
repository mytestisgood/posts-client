export interface BanksDepartmentIdGetParameters {
  departmentId2: string;
  departmentId?: boolean;
  token?: string;
}

export interface BanksGetResponse {
  id?: string;
  name?: string;
  bank_branches?: Array<BankBranches>;
}

export interface BankBranches {
  id?: string;
  number?: string;
  bank_id?: string;
  name?: string;
}

export interface BanksGetParameters {
  withBranches?: boolean;
  token?: string;
}