import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { GetGroupThingInProcessGetParameters, GetGroupThingInProcessGetResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class GroupThingService {
  constructor(private http: HttpClient) {
  }

  public apiProcessesGetGroupThingInProcessGet(data: GetGroupThingInProcessGetParameters): Observable<GetGroupThingInProcessGetResponse> {
    return this.http.get<GetGroupThingInProcessGetResponse>(`${environment.authUrl}/api/processes/getGroupThingInProcess`, { params: createObjectHttpParams(data) });
  }
}