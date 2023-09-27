import { IdAndNameResponse, PriorityType, StatusEmployer } from './common.models';

export interface GetOrganizationsResponse {
  id?: string;
  name?: string;
  organization_group_id?: string;
  employer?: Array<OrganizationsGetOrganizationsEmployer>;
}

export interface OrganizationsGetOrganizationsEmployer {
  id?: number;
  name?: string;
  identifier?: string;
  status?: StatusEmployer;
  priority_type?: PriorityType;
  department?: Array<IdAndNameResponse>;
}