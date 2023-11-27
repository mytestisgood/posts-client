import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { StatusGetParameters, StatusGetResponse, UploadPostResponse } from '../models';
import {FileWithLoading} from "@shared/entities";

@Injectable({
  providedIn: 'root',
})
export class FilesMyHrService {
  constructor(private http: HttpClient) {
  }

  public apiStatusGet(data: StatusGetParameters): Observable<StatusGetResponse> {
    return this.http.get<StatusGetResponse>(`${environment.fileUploadUrl}/api/status`, { params: createObjectHttpParams(data) });
  }

  public apiUploadPost(data: { file: Blob }): Observable<UploadPostResponse> {
    const formData = new FormData();
    formData.append('file', data.file);

    return this.http.post<UploadPostResponse>(`${environment.fileUploadUrl}/api/upload`, formData);
  }
}
