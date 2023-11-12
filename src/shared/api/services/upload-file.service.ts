import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {catchError, map, Observable, of} from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  ProcessDetails,
  ProcessesUploadFileBody,
  UploadFileGetParameters,
  UploadFilePostResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  constructor(private http: HttpClient) {
  }

  public apiProcessesUploadFileGet(data: UploadFileGetParameters): Observable<ProcessDetails> {
    return this.http.get<ProcessDetails>(`${environment.authUrl}/api/processes/uploadFile`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesUploadFilePost(data: ProcessesUploadFileBody): Observable<UploadFilePostResponse> {
     return this.http.post<UploadFilePostResponse>(`${environment.authUrl}/api/processes/uploadFile`, data)
       .pipe(map(result=> result),
         catchError(err => {return of (err)}))
  }
}
