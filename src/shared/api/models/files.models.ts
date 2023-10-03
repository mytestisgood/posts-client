import { DocumentTypes } from './common.models';

export interface DocumentIdDeleteParameters {
  documentId: string;
  employerId?: string;
}

export interface DocumentIdGetParameters {
  documentId: string;
  employerId?: string;
}

export interface EmployerIdIsNegativeFileGetParameters {
  employerId: string;
  employerId2?: string;
}

export interface DocumentsGetParameters {
  checkUnitType?: boolean;
  employerId?: string;
  page?: string;
  limit?: string;
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

export interface ApiDocumentsBody {
  opswatIds?: string;
  description?: string;
  date?: number;
  employer_id?: number;
  documentType?: DocumentTypes;
}

export interface GeneralsDownloadExampleFileBody {
  filename?: string;
}