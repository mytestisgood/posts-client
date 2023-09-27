import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  MtbCreateOrUpdateMtbGroupParameters,
  MtbCreateOrUpdateMtbGroupResponse,
  MtbEntityGetParameters,
  MtbEntityGetResponse,
  MtbGetParameters,
  MtbGetResponse,
  MtbGroupEmployeesParameters,
  MtbGroupHistoryProcessIdGetParameters,
  MtbGroupHistoryProcessIdGetResponse,
  MtbUploadEmployeeDeclarationParameters,
  SuccessResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class MonthlyTransferBlockService {
  constructor(private http: HttpClient) {
  }

  public apiMtbCreateOrUpdateMtbGroupPost(data: MtbCreateOrUpdateMtbGroupParameters): Observable<MtbCreateOrUpdateMtbGroupResponse> {
    return this.http.post<MtbCreateOrUpdateMtbGroupResponse>(`${environment.authUrl}/api/mtb/createOrUpdateMtbGroup/`, data);
  }

  public apiMtbEntityGet(data: MtbEntityGetParameters): Observable<MtbEntityGetResponse> {
    return this.http.get<MtbEntityGetResponse>(`${environment.authUrl}/api/mtb/entity/`, { params: createObjectHttpParams(data) });
  }

  public apiMtbGet(data: MtbGetParameters): Observable<MtbGetResponse> {
    return this.http.get<MtbGetResponse>(`${environment.authUrl}/api/mtb/`, { params: createObjectHttpParams(data) });
  }

  public apiMtbGroupEmployeesPost(data: MtbGroupEmployeesParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/mtb/groupEmployees/`, data);
  }

  public apiMtbGroupHistoryProcessIdGet(data: MtbGroupHistoryProcessIdGetParameters): Observable<Array<MtbGroupHistoryProcessIdGetResponse>> {
    return this.http.get<Array<MtbGroupHistoryProcessIdGetResponse>>(`${environment.authUrl}/api/mtb/groupHistory/${data.processId}/`, { params: createObjectHttpParams(data) });
  }

  public apiMtbUploadEmployeeDeclarationPost(data: MtbUploadEmployeeDeclarationParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/mtb/uploadEmployeeDeclaration/`, data);
  }
}