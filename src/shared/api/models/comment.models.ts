export interface GeneralsCommentBody {
  content?: string;
  content_type?: string;
  criteria?: ApiGeneralsCommentCriteria;
  department_id?: string;
  employer_id?: number;
  event_code?: number;
  limit?: number;
  organization_id?: number;
  page?: number;
  ids?: Array<string>;
}

export interface GeneralsGetCommentsBody {
  content_type?: string;
  criteria?: ApiGeneralsCommentCriteria;
  department_id?: string;
  employer_id?: number;
  event_code?: number;
  limit?: number;
  organization_id?: number;
  page?: number;
  ids?: Array<string>;
}

export interface ApiGeneralsCommentCriteria {
  organization_id?: string;
  employer_id?: number;
  department_id?: string;
  event_code?: string;
  page?: number;
  limit?: number;
}

export interface IdDeleteCommentBody {
  content_type?: string;
  emploee_id?: number;
}

export interface DeleteCommentByIdParameters {
  id: number;
  idDeleteCommentBody?: IdDeleteCommentBody;
}