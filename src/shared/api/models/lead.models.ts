import { Src } from './common.models';

export interface LeadsCreateLeadBody {
  phone?: string;
  email?: string;
  name?: string;
  friend_name?: string;
  friend_email?: string;
  src?: Src;
}