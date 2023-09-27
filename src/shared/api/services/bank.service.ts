import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { BanksDepartmentIdGetParameters, BanksGetParameters, BanksGetResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  constructor(private http: HttpClient) {
  }

  public apiDepartmentsGetDepartmentBanksDepartmentIdGet(data: BanksDepartmentIdGetParameters): Observable<Array<BanksGetResponse>> {
    return this.http.get<Array<BanksGetResponse>>(`${environment.authUrl}/api/departments/getDepartmentBanks/${data.departmentId}/`, { params: createObjectHttpParams(data) });
  }

  public apiGeneralsBanksGet(data: BanksGetParameters): Observable<Array<BanksGetResponse>> {
    return this.http.get<Array<BanksGetResponse>>(`${environment.authUrl}/api/generals/banks/`, { params: createObjectHttpParams(data) });
  }
}