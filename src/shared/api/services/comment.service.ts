import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  Comment,
  CommentPostParameters,
  DeleteCommentByIdParameters,
  GetCommentResponse,
  SuccessResponseOnlyMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private readonly http: HttpClient) {
  }

  public apiGeneralsCommentPost(data: CommentPostParameters): Observable<SuccessResponseOnlyMessage> {
    return this.http.post<SuccessResponseOnlyMessage>(`${environment.authUrl}/api/generals/comment/`, data);
  }

  public apiGeneralsGetCommentsPost(data: GetCommentResponse): Observable<Array<Comment>> {
    return this.http.post<Array<Comment>>(`${environment.authUrl}/api/generals/getComments/`, data);
  }

  public apiGeneralsIdDeleteCommentPost(data: DeleteCommentByIdParameters): Observable<SuccessResponseOnlyMessage> {
    return this.http.post<SuccessResponseOnlyMessage>(`${environment.authUrl}/api/generals/${data.id}/deleteComment/`, data);
  }
}