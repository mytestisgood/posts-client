import { ModuleResponse, Roles } from './common.models';
import { UserResponse } from './user.models';

export interface SignInResponse {
  token?: string;
  role?: Roles;
  name?: string;
  module?: Array<ModuleResponse>;
  user?: UserResponse;
  organization_group_id?: number;
}

export interface ApiLoginBody {
  email: string;
  password: string;
}