import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  StatusGetParameters,
  StatusGetResponse,
  UploadPostParameters,
  UploadPostResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class FilesMyHrService {
  constructor(private http: HttpClient) {
  }

  public apiStatusGet(data: StatusGetParameters): Observable<StatusGetResponse> {
    return this.http.get<StatusGetResponse>(`${environment.authUrl}/api/status/`, { params: createObjectHttpParams(data) });
  }

  public apiUploadPost(data: UploadPostParameters): Observable<UploadPostResponse> {
    return this.http.post<UploadPostResponse>(`${environment.authUrl}/api/upload/`, data);
  }
}