import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  FeedbackPostParameters,
  FeedbacksChangeStatusPostParameters,
  FeedbacksGetTransferParameters,
  FeedbacksGetTransferResponse,
  FeedbacksPostResponse,
  FeedbacksProcessIdGetDetailsParameters,
  FeedbacksProcessIdGetDetailsResponse,
  FeedbacksRecordsListGetParameters,
  FeedbacksRecordsListGetResponse,
  ResultResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class FeedBackService {
  constructor(private readonly http: HttpClient) {
  }

  public apiFeedbacksChangeStatusPost(data: FeedbacksChangeStatusPostParameters): Observable<ResultResponse> {
    return this.http.post<ResultResponse>(`${environment.authUrl}/api/feedbacks/changeStatus/`, data);
  }

  public apiFeedbacksFeedbackPost(data: FeedbackPostParameters): Observable<FeedbacksPostResponse> {
    return this.http.post<FeedbacksPostResponse>(`${environment.authUrl}/api/feedbacks/feedback/`, data);
  }

  public apiFeedbacksGetTransferGet(data: FeedbacksGetTransferParameters): Observable<FeedbacksGetTransferResponse> {
    return this.http.get<FeedbacksGetTransferResponse>(`${environment.authUrl}/api/feedbacks/getTransfer/`, { params: createObjectHttpParams(data) });
  }

  public apiFeedbacksProcessIdGetDetailsFeedBackGet(data: FeedbacksProcessIdGetDetailsParameters): Observable<FeedbacksProcessIdGetDetailsResponse> {
    return this.http.get<FeedbacksProcessIdGetDetailsResponse>(`${environment.authUrl}/api/feedbacks/${data.processId}/getDetailsFeedBack/`, { params: createObjectHttpParams(data) });
  }

  public apiFeedbacksRecordsListGet(data: FeedbacksRecordsListGetParameters): Observable<FeedbacksRecordsListGetResponse> {
    return this.http.get<FeedbacksRecordsListGetResponse>(`${environment.authUrl}/api/feedbacks/recordsList/`, { params: createObjectHttpParams(data) });
  }
}