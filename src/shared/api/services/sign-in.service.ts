import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { ApiLoginBody, SignInResponse, SuccessResponse, UsersCheckVerifyCodeBody } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {
  }

  public apiLoginPost(data: ApiLoginBody): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.authUrl}/api/login`, data);
  }

  public apiUsersCheckVerifyCodePost(data: UsersCheckVerifyCodeBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/checkVerifyCode`, data);
  }

  public apiUsersSendVerifyCodeGet(): Observable<SuccessResponse> {
    return this.http.get<SuccessResponse>(`${environment.authUrl}/api/users/sendVerifyCode`);
  }
}
