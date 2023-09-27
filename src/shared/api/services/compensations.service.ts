import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  CompensationPostParameters,
  CompensationsEmployeeIdCompanyEmployeeGetParameters,
  CompensationSendPostParameters,
  CompensationSendPostResponse,
  CompensationsGetParameters,
  CompensationsGetResponse,
  CompensationsUpdateSentStatusParameters,
  DownloadExampleFilePostParameters,
  FileDataExeResponse,
  SuccessResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class CompensationsService {
  constructor(private http: HttpClient) {
  }

  public apiCompensationsDownloadExampleFilePost(data: DownloadExampleFilePostParameters): Observable<FileDataExeResponse> {
    return this.http.post<FileDataExeResponse>(`${environment.authUrl}/api/compensations/downloadExampleFile/`, data);
  }

  public apiCompensationsGet(data: CompensationsGetParameters): Observable<CompensationsGetResponse> {
    return this.http.get<CompensationsGetResponse>(`${environment.authUrl}/api/compensations/`, { params: createObjectHttpParams(data) });
  }

  public apiCompensationsPost(data: CompensationPostParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/compensations/`, data);
  }

  public apiCompensationsSendPost(data: CompensationSendPostParameters): Observable<CompensationSendPostResponse> {
    return this.http.post<CompensationSendPostResponse>(`${environment.authUrl}/api/compensations/send/`, data);
  }

  public apiCompensationsUpdateSentStatusPost(data: CompensationsUpdateSentStatusParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/compensations/updateSentStatus/`, data);
  }

  public apiCompensationsEmployeeIdCompanyEmployeeGet(data: CompensationsEmployeeIdCompanyEmployeeGetParameters): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/compensations/${data.employeeId}/companyEmployee/`, { params: createObjectHttpParams(data) });
  }
}