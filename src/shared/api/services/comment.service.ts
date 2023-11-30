import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import {
  Comment,
  DeleteCommentByIdParameters,
  GeneralsCommentBody,
  GeneralsGetCommentsBody,
  SuccessResponseOnlyMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly http: HttpClient) {
  }

  public apiGeneralsCommentPost(data: GeneralsCommentBody): Observable<SuccessResponseOnlyMessage> {
    return this.http.post<SuccessResponseOnlyMessage>(`${environment.authUrl}/api/generals/comment`, data);
  }

  public apiGeneralsGetCommentsPost(data: GeneralsGetCommentsBody): Observable<Array<Comment>> {
    return this.http.post<Array<Comment>>(`${environment.authUrl}/api/generals/getComments`, data);
  }

  public apiGeneralsIdDeleteCommentPost(data: DeleteCommentByIdParameters): Observable<SuccessResponseOnlyMessage> {
    return this.http.post<SuccessResponseOnlyMessage>(`${environment.authUrl}/api/generals/${data.id}/deleteComment`, data);
  }
}
