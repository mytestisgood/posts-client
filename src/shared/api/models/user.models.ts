import { ConnectType, Roles } from './common.models';

export interface UserResponse {
  id?: number;
  identifier?: string;
  role?: Roles;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  organization_group_id?: number;
  is_registered?: boolean;
  name?: string;
  connect_type?: ConnectType;
  is_skip?: boolean;
  is_active?: boolean;
}

export interface UsersCheckVerifyCodeBody {
  code?: string;
  departmentId?: number;
}

export interface UsersChangeEmailBody {
  email?: string;
}