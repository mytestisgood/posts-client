import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  CreateEmployerOutResponse,
  EmployersCreateEmployerOutBody,
  EmployersCreatePaymentOutBody,
  EmployersCreateUserOutParameters,
  SuccessResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {
  }

  public apiEmployersCreateEmployerOutPost(data: EmployersCreateEmployerOutBody): Observable<CreateEmployerOutResponse> {
    return this.http.post<CreateEmployerOutResponse>(`${environment.authUrl}/api/employers/createEmployerOut/`, data);
  }

  public apiEmployersCreateUserOutPost(data: EmployersCreateUserOutParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/employers/createUserOut/`, data);
  }

  public apiEmployersCreatePaymentOut(data: EmployersCreatePaymentOutBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/employers/createPaymentOut/`, data)
  }
}