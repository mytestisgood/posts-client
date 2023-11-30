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

export enum StepUserEnum {
  upload_file = 'upload-file',
  'set_password' = 'set_password',
  transfer_money = 'transfer-money',
  payments_instruction = 'payments-instruction',
  confirm_payment = 'confirm-payment',
  finish = 'finish',
}
