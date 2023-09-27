export interface GetEmailEmployerContactGetParameters {
  departmentId: string;
  employerId: string;
  type: string;
  token?: string;
}

export interface EmployerContactsPostResponse {
  ok?: boolean;
  data?: Array<EmployerContactsPostResponseData>;
}

export interface EmployerContactsPostResponseData {
  id?: number;
  name?: string;
  code?: number;
}

export interface EmployerContactsPostParameters {
  token?: string;
  contactsEmployerContactsBody?: ContactsEmployerContactsBody
}

export interface ContactsEmployerContactsBody {
  content_type?: string;
  employerId?: number;
  objectId?: number;
  type?: string;
  typesFilter?: Array<string>;
}