import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import {catchError, map, Observable, of} from 'rxjs';
import {
  CreateEmployerOutResponse,
  EmployersCreateEmployerOutBody,
  EmployersCreatePaymentOutBody, EmployersUpdatePaymentOutBody,
  RegisterParameters,
  RegisterResponse, SendEmailUserContinueProcessParameters, SendEmailUserContinueProcessResponse,
  SuccessResponse,
} from '../models';
import {AllRegistrationSessionData, BaseResponse, UserProcessDataByStepResponse} from "@shared/entities";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {
  }

  public apiEmployersCreateEmployerOutPost(data: EmployersCreateEmployerOutBody): Observable<CreateEmployerOutResponse> {
    return this.http.post<CreateEmployerOutResponse>(`${environment.authUrl}/api/employers/createEmployerOut`, data)
      // .pipe(map(result=> result),
      //   catchError(err => {return of (err)}));
  }

  public apiEmployersUpdateEmployerOut(data: EmployersCreateEmployerOutBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/employers/updateEmployerOut`, data)
  }

  public apiEmployersCreatePaymentOut(data: EmployersCreatePaymentOutBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/employers/createPaymentOut`, data)
  }

  public apiEmployersUpdatePaymentOut(data: EmployersUpdatePaymentOutBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/employers/updatePaymentOut`, data)
  }


  public apiRegisterPost(data: RegisterParameters): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${environment.authUrl}/api/register`, data)
  }


  public sendEmailUserContinueProcess(data: SendEmailUserContinueProcessParameters): Observable<SendEmailUserContinueProcessResponse> {
    return this.http.post<SendEmailUserContinueProcessResponse>(`${environment.authUrl}/api/users/sendEmailUserContinueProcess`, data)
  }

  public getUserProcessDataByStep(): Observable<UserProcessDataByStepResponse> {
    return this.http.get<UserProcessDataByStepResponse>(`${environment.authUrl}/api/users/getUserProcessDataByStep`)
  }
  public apiRegisterUpdateUserStep(): Observable<BaseResponse> {
    return this.http.get<BaseResponse>(`${environment.authUrl}/api/users/updateUserStep`)
  }
}
