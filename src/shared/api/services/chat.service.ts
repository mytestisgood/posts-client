import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  ChatIdGetParameters,
  ChatIdGetResponse,
  ChatResponse,
  ChatsGetParameters,
  ChatsGetTatSubjectsGetParameters,
  ChatsPostParameters,
  ChatsPostResponse,
  ChatsSaveMessageChatParameters,
  ChatsSaveMessageChatResponse,
  IdAndNameResponse,
  TokenParameters,
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient) {
  }

  public apiChatsChatIdGet(data: ChatIdGetParameters): Observable<ChatIdGetResponse> {
    return this.http.get<ChatIdGetResponse>(`${environment.authUrl}/api/chats/${data.chatId}/`, { params: createObjectHttpParams(data) });
  }

  public apiChatsGet(data: ChatsGetParameters): Observable<Array<ChatResponse>> {
    return this.http.get<Array<ChatResponse>>(`${environment.authUrl}/api/chats/`, { params: createObjectHttpParams(data) });
  }

  public apiChatsGetChatSubjectsGet(data: TokenParameters): Observable<Array<IdAndNameResponse>> {
    return this.http.get<Array<IdAndNameResponse>>(`${environment.authUrl}/api/chats/getChatSubjects/`, { params: createObjectHttpParams(data) });
  }

  public apiChatsGetTatSubjectsGet(data: ChatsGetTatSubjectsGetParameters): Observable<Array<IdAndNameResponse>> {
    return this.http.get<Array<IdAndNameResponse>>(`${environment.authUrl}/api/chats/getTatSubjects/`, { params: createObjectHttpParams(data) });
  }

  public apiChatsPost(data: ChatsPostParameters): Observable<ChatsPostResponse> {
    return this.http.post<ChatsPostResponse>(`${environment.authUrl}/api/chats/`, data);
  }

  public apiChatsSaveMessageChatPost(data: ChatsSaveMessageChatParameters): Observable<ChatsSaveMessageChatResponse> {
    return this.http.post<ChatsSaveMessageChatResponse>(`${environment.authUrl}/api/chats/saveMessageChat/`, data);
  }
}