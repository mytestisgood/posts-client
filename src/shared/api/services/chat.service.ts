import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  ApiChatsBody,
  ChatIdGetResponse,
  ChatResponse,
  ChatsGetParameters,
  ChatsGetTatSubjectsGetParameters,
  ChatsPostResponse,
  ChatsSaveMessageChatBody,
  ChatsSaveMessageChatResponse,
  IdAndNameResponse,
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  public apiChatsChatIdGet(chatId: number): Observable<ChatIdGetResponse> {
    return this.http.get<ChatIdGetResponse>(`${environment.authUrl}/api/chats/${chatId}`);
  }

  public apiChatsGet(data: ChatsGetParameters): Observable<Array<ChatResponse>> {
    return this.http.get<Array<ChatResponse>>(`${environment.authUrl}/api/chats`, { params: createObjectHttpParams(data) });
  }

  public apiChatsGetChatSubjectsGet(): Observable<Array<IdAndNameResponse>> {
    return this.http.get<Array<IdAndNameResponse>>(`${environment.authUrl}/api/chats/getChatSubjects`);
  }

  public apiChatsGetTatSubjectsGet(data: ChatsGetTatSubjectsGetParameters): Observable<Array<IdAndNameResponse>> {
    return this.http.get<Array<IdAndNameResponse>>(`${environment.authUrl}/api/chats/getTatSubjects`, { params: createObjectHttpParams(data) });
  }

  public apiChatsPost(data: ApiChatsBody): Observable<ChatsPostResponse> {
    return this.http.post<ChatsPostResponse>(`${environment.authUrl}/api/chats`, data);
  }

  public apiChatsSaveMessageChatPost(data: ChatsSaveMessageChatBody): Observable<ChatsSaveMessageChatResponse> {
    return this.http.post<ChatsSaveMessageChatResponse>(`${environment.authUrl}/api/chats/saveMessageChat`, data);
  }
}
