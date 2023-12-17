import {IdAndNameResponse} from './common.models';

export interface GetLeadingCompaniesResponse {
  items?: Array<LeadCompany>;
  code?: number;
}

export interface LeadCompany {
  id?: string;
  name?: string;
  bigImg?: string;
  smallImg?: string;
}
