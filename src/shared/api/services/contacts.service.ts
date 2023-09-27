import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  EmployerContactsPostParameters,
  EmployerContactsPostResponse,
  GetEmailEmployerContactGetParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {
  }

  public apiContactsEmployerContactsPost(data: EmployerContactsPostParameters): Observable<EmployerContactsPostResponse> {
    return this.http.post<EmployerContactsPostResponse>(`${environment.authUrl}/api/contacts/employerContacts/`, data);
  }

  public apiContactsTypeGetEmailEmployerContactGet(data: GetEmailEmployerContactGetParameters): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/contacts/{type}/getEmailEmployerContact/`, { params: createObjectHttpParams(data) });
  }
}