import {IdAndNameResponse} from './common.models';

export interface GetLeadingCompaniesResponse {
  items?: Array<LeadCompany>;
  code?: number;
}

export interface LeadCompany {
  id?: string;
  name?: string;
  bigImag?: Image;
  smallImag?: string;
}

export interface Image {
  filename?: string;
  ext?: string;
  data?: string;
}
