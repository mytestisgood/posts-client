import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { FindExceptionForEmployerProcessIdGet } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExceptionsService {
  constructor(private http: HttpClient) {
  }

  public apiExceptionsFindExceptionForEmployerProcessIdGet(data: FindExceptionForEmployerProcessIdGet): Observable<boolean> {
    return this.http.get<boolean>(`${environment.authUrl}/api/exceptions/findExceptionForEmployer/${data.processId}/`, { params: createObjectHttpParams(data) });
  }
}