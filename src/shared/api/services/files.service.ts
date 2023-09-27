import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  DocumentIdDeleteParameters,
  DocumentIdGetParameters,
  DocumentsGetParameters,
  DocumentsGetResponse,
  DocumentsPostParameters,
  EmployerIdIsNegativeFileGetParameters,
  FileDataExtResponse,
  GeneralsDownloadExampleFileParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private http: HttpClient) {
  }

  public apiDocumentsDocumentIdDelete(data: DocumentIdDeleteParameters): Observable<string> {
    return this.http.delete<string>(`${environment.authUrl}/api/documents/${data.documentId}/${data}`);
  }

  public apiDocumentsDocumentIdGet(data: DocumentIdGetParameters): Observable<FileDataExtResponse> {
    return this.http.get<FileDataExtResponse>(`${environment.authUrl}/api/documents/${data.documentId}/`, { params: createObjectHttpParams(data) });
  }

  public apiDocumentsEmployerIdIsNegativeFileGet(data: EmployerIdIsNegativeFileGetParameters): Observable<boolean> {
    return this.http.get<boolean>(`${environment.authUrl}/api/documents/${data.employerId}/isNegativeFile/`, { params: createObjectHttpParams(data) });
  }

  public apiDocumentsGet(data: DocumentsGetParameters): Observable<DocumentsGetResponse> {
    return this.http.get<DocumentsGetResponse>(`${environment.authUrl}/api/documents/`, { params: createObjectHttpParams(data) });
  }

  public apiDocumentsPost(data: DocumentsPostParameters): Observable<string> {
    return this.http.post<string>(`${environment.authUrl}/api/documents/`, data);
  }

  public apiGeneralsDownloadExampleFilePost(data: GeneralsDownloadExampleFileParameters): Observable<FileDataExtResponse> {
    return this.http.post<FileDataExtResponse>(`${environment.authUrl}/api/generals/downloadExampleFile/`, data)
  }
}