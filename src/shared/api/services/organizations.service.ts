import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { GetOrganizationsResponse } from '@shared/api/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrganizationsService {
  constructor(private http: HttpClient) {
  }

  public apiOrganizationsGetOrganizationsGet(): Observable<Array<GetOrganizationsResponse>> {
    return this.http.get<Array<GetOrganizationsResponse>>(`${environment.authUrl}/api/organizations/getOrganizations`);
  }
}