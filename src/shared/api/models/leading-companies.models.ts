import { IdAndNameResponse } from './common.models';

export interface GetLeadingCompaniesResponse {
  items?: Array<IdAndNameResponse>;
  code?: number;
}