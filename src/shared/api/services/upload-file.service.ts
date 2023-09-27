import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  UploadFileGetParameters,
  UploadFilePostParameters,
  UploadFilePostResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {
  }

  public apiProcessesUploadFileGet(data: UploadFileGetParameters): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/processes/uploadFile/`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesUploadFilePost(data: UploadFilePostParameters): Observable<UploadFilePostResponse> {
    return this.http.post<UploadFilePostResponse>(`${environment.authUrl}/api/processes/uploadFile/`, data);
  }
}