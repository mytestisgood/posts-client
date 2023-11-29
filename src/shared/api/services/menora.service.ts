import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import { MenoraGetParameters, MenoraGetResponse } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MenoraService {
  constructor(private http: HttpClient) {
  }

  public apiMenoraGet(data: MenoraGetParameters): Observable<MenoraGetResponse> {
    return this.http.get<MenoraGetResponse>(`${environment.authUrl}/api/menora`, { params: createObjectHttpParams(data) });
  }
}
