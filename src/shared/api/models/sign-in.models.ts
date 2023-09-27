import { ModuleResponse, Roles } from './common.models';
import { UserResponse, UsersCheckVerifyCodeBody } from './user.models';

export interface SignInResponse {
  token?: string;
  role?: Roles;
  name?: string;
  module?: Array<ModuleResponse>;
  user?: UserResponse;
  organization_group_id?: number;
}

export interface SignInParameters {
  token: string;
  apiLoginBody: ApiLoginBody
}

export interface ApiLoginBody {
  email: string;
  password: string;
}

export interface UsersCheckVerifyCodeParameters {
  token: string;
  usersCheckVerifyCodeBody: UsersCheckVerifyCodeBody;
}