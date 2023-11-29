import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  GetBankDetailsSmartiParameters,
  GetBankDetailsSmartiResponse,
  GetEmployeesListGetParameters,
  IdAndNameResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private http: HttpClient) {
  }

  public apiEmployeesGetEmployeesListGet(data: GetEmployeesListGetParameters): Observable<Array<IdAndNameResponse>> {
    return this.http.get<Array<IdAndNameResponse>>(`${environment.authUrl}/api/employees/getEmployeesList`, { params: createObjectHttpParams(data) });
  }

  public apiEmployeesGetBankDetailsSmarti(data: GetBankDetailsSmartiParameters): Observable<GetBankDetailsSmartiResponse> {
    return this.http.get<GetBankDetailsSmartiResponse>(`${environment.authUrl}/api/employers/getBankDetailsSmarti`, { params: createObjectHttpParams(data) });
  }
}
