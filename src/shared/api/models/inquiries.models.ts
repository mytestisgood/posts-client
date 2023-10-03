export interface Model1InquiriesBody {
  inquiry?: InquiriesInquiry;
  employer_id?: number;
  opswatIds?: Array<string>;
}

export interface InquiriesInquiry {
  employer_id?: number;
  content_type?: string;
}

export interface InquiriesResponse {
  id?: string;
  created_at?: string;
  updated_at?: string;
  reminder_date?: string;
  content?: string;
  has_documents?: boolean;
  receivers?: Array<InquiriesReceivers>;
}

export interface InquiriesReceivers {
  email?: string;
}

export interface Model1NewInquiryBody {
  inquiry?: InquiryItem;
  employer_id?: number;
  opswatIds?: Array<string>;
}

export interface InquiryItem {
  contact_list?: Array<number>;
  emails_list?: Array<string>;
  isReference?: boolean;
  isAttachFile?: boolean;
  isIncorrectEmployees?: boolean;
  employer_id?: number;
  objectID?: number;
  contentType?: string;
  company_id?: number;
  product_name?: string;
  activeContentType?: string;
  content_type?: string;
}

