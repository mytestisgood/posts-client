import { StatusChat } from './common.models';

export interface ChatIdGetParameters {
  chatId: number;
  token?: string;
}

export interface ChatIdGetResponse {
  messages?: Array<ChatMessagesResponse>;
  chat?: ChatIdResponse;
  messages_count?: number;
  code?: number;
}

export interface ChatMessagesResponse {
  id?: number;
  content?: string;
  username?: string;
  myself?: boolean;
  created_at?: string;
  updated_at?: string;
  is_files?: boolean;
}

export interface ChatIdResponse {
  id?: number;
  created_at?: string;
  updated_at?: string;
  subject?: string;
  subject_id?: number;
  tat_subject?: string;
  tat_subject_id?: string;
  status?: StatusChat;
  creator_name?: string;
  employer_name?: string;
  employer_id?: number;
}

export interface ChatsGetParameters {
  status?: 'all' | 'open' | 'in_treatment' | 'close';
  organizationId?: string;
  employerId?: string;
  token?: string;
}

export interface ChatResponse {
  id?: number;
  created_at?: string;
  updated_at?: string;
  content?: string;
  subject?: string;
  subject_id?: number;
  tat_subject?: string;
  tat_subject_id?: string;
  status?: StatusChat;
  creator_name?: string;
  employer_name?: string;
  employer_id?: number;
  employee_name?: string;
  new_messages?: number;
  operator_name?: string;
}

export interface ChatsGetTatSubjectsGetParameters {
  subjectId?: number;
  token?: string;
}

export interface ChatsPostParameters {
  token?: string;
  apiChatsBody?: ApiChatsBody;
}

export interface ApiChatsBody {
  opswatIds?: string;
  message?: string;
  chat?: ApiChatsChat;
  employer_id?: number;
}

export interface ApiChatsChat {
  subject_id?: number;
  salary_month?: string;
  employee_id?: number;
  tat_subject_id?: number;
  content?: string;
}

export interface ChatsPostResponse {
  message?: string;
  chat_id?: number;
}

export interface ChatsSaveMessageChatParameters {
  token?: string;
  chatsSaveMessageChatBody?: ChatsSaveMessageChatBody;
}

export interface ChatsSaveMessageChatBody {
  opswatIds?: string;
  message?: string;
  chat_id?: number;
  employer_id?: number;
}

export interface ChatsSaveMessageChatResponse {
  message?: string;
  is_called?: boolean;
  code?: number;
}