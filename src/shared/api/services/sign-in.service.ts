import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
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

  public apiUsersSendVerifyCodePost(): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/sendVerifyCode`, {});
  }
}