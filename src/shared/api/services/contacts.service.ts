import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  ContactsEmployerContactsBody,
  EmployerContactsPostResponse,
  GetEmailEmployerContactGetParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {
  }

  public apiContactsEmployerContactsPost(data: ContactsEmployerContactsBody): Observable<EmployerContactsPostResponse> {
    return this.http.post<EmployerContactsPostResponse>(`${environment.authUrl}/api/contacts/employerContacts`, data);
  }

  public apiContactsTypeGetEmailEmployerContactGet(data: GetEmailEmployerContactGetParameters): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/contacts/{type}/getEmailEmployerContact/`, { params: createObjectHttpParams(data) });
  }
}
