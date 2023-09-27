import { DocumentTypes } from './common.models';

export interface DocumentIdDeleteParameters {
  documentId: string;
  employerId?: string;
  token?: string;
}

export interface DocumentIdGetParameters {
  documentId: string;
  employerId?: string;
  token?: string;
}

export interface EmployerIdIsNegativeFileGetParameters {
  employerId: string;
  employerId2?: string;
  token?: string;
}

export interface DocumentsGetParameters {
  checkUnitType?: boolean;
  employerId?: string;
  page?: string;
  limit?: string;
  token?: string;
}

export interface DocumentsGetResponse {
  items?: Array<DocumentsGetResponseItems>;
  total?: number;
  lastPage?: number;
  code?: number;
}

export interface DocumentsGetResponseItems {
  id?: string;
  name?: string;
  ext?: string;
  description?: string;
  created_at?: string;
  employer_name?: number;
  employer_id?: string;
  document_type?: DocumentTypes;
}

export interface DocumentsPostParameters {
  token?: string;
  apiDocumentsBody?: ApiDocumentsBody;
}

export interface ApiDocumentsBody {
  opswatIds?: string;
  description?: string;
  date?: number;
  employer_id?: number;
  documentType?: DocumentTypes;
}

export interface GeneralsDownloadExampleFileParameters {
  token?: string;
  generalsDownloadExampleFileBody?: GeneralsDownloadExampleFileBody;
}

export interface GeneralsDownloadExampleFileBody {
  filename?: string;
}