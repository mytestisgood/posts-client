import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { TokenParameters } from '../models';
import { GetOrganizationsResponse } from '../models/organications.models';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(private http: HttpClient) {
  }

  public apiOrganizationsGetOrganizationsGet(data: TokenParameters): Observable<Array<GetOrganizationsResponse>> {
    return this.http.get<Array<GetOrganizationsResponse>>(`${environment.authUrl}/api/organizations/getOrganizations/`, { params: createObjectHttpParams(data) });
  }
}