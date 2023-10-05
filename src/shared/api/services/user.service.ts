import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { EmployersCreateUserOutBody, SuccessResponse, UsersChangeEmailBody } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public apiUsersChangeEmailPost(data: UsersChangeEmailBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/changeEmail`, data);
  }

  public apiEmployersCreateUserOutPost(data: EmployersCreateUserOutBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/users/createUserOut`, data);
  }
}