import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  CompensationReportGetParameters,
  CompensationReportGetResponse,
  EmployerReportBody,
  EmployerReportResponse,
  FeedbackEmployerReportGetParameters,
  FeedbackEmployerReportGetResponse,
  GetTypeLoadParameters,
  TypeLoad,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {
  }

  public apiEmployersGetTypeLoadGet(data: GetTypeLoadParameters): Observable<TypeLoad> {
    return this.http.get<TypeLoad>(`${environment.authUrl}/api/employers/getTypeLoad`, { params: createObjectHttpParams(data) });
  }

  public apiReportsCompensationReportGet(data: CompensationReportGetParameters): Observable<CompensationReportGetResponse> {
    return this.http.get<CompensationReportGetResponse>(`${environment.authUrl}/api/reports/CompensationReport`, { params: createObjectHttpParams(data) });
  }

  public apiReportsEmployerReportPost(data: EmployerReportBody): Observable<EmployerReportResponse> {
    return this.http.post<EmployerReportResponse>(`${environment.authUrl}/api/reports/employerReport`, data);
  }

  public apiReportsFeedbackEmployerReportGet(data: FeedbackEmployerReportGetParameters): Observable<FeedbackEmployerReportGetResponse> {
    return this.http.get<FeedbackEmployerReportGetResponse>(`${environment.authUrl}/api/reports/feedbackEmployerReport`, { params: createObjectHttpParams(data) });
  }
}
