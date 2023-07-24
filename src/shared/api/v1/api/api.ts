export * from './enums.service';
import { EnumsService } from './enums.service';
export * from './lead.service';
import { LeadService } from './lead.service';
export * from './signIn.service';
import { SignInService } from './signIn.service';
export const APIS = [EnumsService, LeadService, SignInService];
