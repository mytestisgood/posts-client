import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  SignInParameters,
  SignInResponse,
  SuccessResponse,
  TokenParameters,
  UsersCheckVerifyCodeParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {
  }

  public apiLoginPost(data: SignInParameters): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${environment.authUrl}/api/login/`, data);
  }

  public apiUsersCheckVerifyCodePost(data: UsersCheckVerifyCodeParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/checkVerifyCode/`, data);
  }

  public apiUsersSendVerifyCodePost(data: TokenParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/sendVerifyCode/`, data);
  }
}