import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { LeadsCreateLeadBody, SuccessResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LeadService {
  constructor(private http: HttpClient) {
  }

  public apiLeadsCreateLeadPost(data: LeadsCreateLeadBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/leads/createLead/`, data);
  }
}