import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { GetLeadingCompaniesResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LeadingCompaniesService {
  constructor(private http: HttpClient) {
  }

  public apiLeadingCompaniesGetLeadingCompaniesGet(): Observable<GetLeadingCompaniesResponse> {
    return this.http.get<GetLeadingCompaniesResponse>(`${environment.authUrl}/api/leading_companies/getLeadingCompanies`);
  }
}
