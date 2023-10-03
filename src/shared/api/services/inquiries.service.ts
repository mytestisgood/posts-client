import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  InquiriesResponse,
  Model1InquiriesBody,
  Model1NewInquiryBody,
  SuccessResponseOnlyMessage,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class InquiriesService {
  constructor(private http: HttpClient) {
  }

  public apiGenerals1InquiriesPost(data: Model1InquiriesBody): Observable<Array<InquiriesResponse>> {
    return this.http.post<Array<InquiriesResponse>>(`${environment.authUrl}/api/generals/1/inquiries`, data);
  }

  public apiGenerals1NewInquiryPost(data: Model1NewInquiryBody): Observable<SuccessResponseOnlyMessage> {
    return this.http.post<SuccessResponseOnlyMessage>(`${environment.authUrl}/api/generals/1/newInquiry`, data);
  }
}