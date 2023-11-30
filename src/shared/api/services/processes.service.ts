import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  BooleanResultResponse,
  CheckIsDateResponse, DocumentIdDeleteParameters,
  DownloadPaymentsInstructionResponse,
  FilesListGetResponse,
  ProcessesChangeFileToNegativeBody,
  ProcessesCheckIsDateBody,
  ProcessesDownloadPaymentsInstructionBody,
  ProcessesFilesListGetParameters,
  ProcessesIdAuthorizationReceiptCertificateBody,
  ProcessesIdAuthorizationReceiptCertificateResponse,
  ProcessesParameters,
  ProcessesSendPaymentsInstructionBody,
  ProcessesSetRecordsBody,
  ProcessesSetRecordsResponse,
  ProcessesTransmitBody,
  ProcessesUnlockProcessFilesBody,
  ProcessesUnlockProcessFilesResponse,
  ProcessesUpdateBody,
  ProcessesUpdateDateAndReferenceBody,
  ProcessesUpdateProcessBody,
  ProcessesUpdateReasonRefundBody,
  ProcessesUpdateTypeProcessBody,
  ProcessIdDeleteParameters,
  ProcessIdDeleteRefDocumentBody,
  ProcessIdDownloadFileGetParameters,
  ProcessIdDownloadFileGetResponse,
  ProcessIdDownloadRefDocumentBody,
  ProcessIdDownloadRefDocumentResponse,
  ProcessIdGetRefDocumentResponse,
  ProcessIdUploadsRefBody,
  ProcessResponse,
  SuccessResponse,
  UpdateDateAndReferenceResponse,
  UpdateReasonRefundResponse,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProcessesService {
  constructor(private http: HttpClient) {
  }

  public apiProcessesChangeFileToNegativePost(data: ProcessesChangeFileToNegativeBody): Observable<BooleanResultResponse> {
    return this.http.post<BooleanResultResponse>(`${environment.authUrl}/api/processes/changeFileToNegative`, data);
  }

  public apiProcessesCheckIsDatePost(data: ProcessesCheckIsDateBody): Observable<CheckIsDateResponse> {
    return this.http.post<CheckIsDateResponse>(`${environment.authUrl}/api/processes/checkIsDate`, data);
  }

  public apiProcessesDownloadPaymentsInstructionPost(data: ProcessesDownloadPaymentsInstructionBody): Observable<DownloadPaymentsInstructionResponse> {
    return this.http.post<DownloadPaymentsInstructionResponse>(`${environment.authUrl}/api/processes/downloadPaymentsInstruction`, data);
  }

  public apiProcessesEmployerIdGetCommentBroadcastGet(employerId: string): Observable<string> {
    return this.http.post<string>(`${environment.authUrl}/api/processes/${employerId}/getCommentBroadcast`, {});
  }

  public apiProcessesFilesListGet(data: ProcessesFilesListGetParameters): Observable<FilesListGetResponse> {
    return this.http.get<FilesListGetResponse>(`${environment.authUrl}/api/processes/filesList`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesGet(data: ProcessesParameters): Observable<ProcessResponse> {
    return this.http.get<ProcessResponse>(`${environment.authUrl}/api/processes`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesProcessIdDelete(data: ProcessIdDeleteParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${data.processId}`, data);
  }

  public apiProcessesProcessIdDeleteRefDocumentPost(processId: string, data: ProcessIdDeleteRefDocumentBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${processId}/deleteRefDocument`, data);
  }

  public apiProcessesProcessIdDownloadFileProcessGet(data: ProcessIdDownloadFileGetParameters): Observable<ProcessIdDownloadFileGetResponse> {
    return this.http.get<ProcessIdDownloadFileGetResponse>(`${environment.authUrl}/api/processes/${data.processId}/downloadFileProcess`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesProcessIdDownloadRefDocumentPost(processId: string, data: ProcessIdDownloadRefDocumentBody): Observable<ProcessIdDownloadRefDocumentResponse> {
    return this.http.post<ProcessIdDownloadRefDocumentResponse>(`${environment.authUrl}/api/processes/${processId}/downloadRefDocument`, data);
  }

  public apiProcessesProcessIdGetRefDocumentGet(processId: string): Observable<ProcessIdGetRefDocumentResponse> {
    return this.http.get<ProcessIdGetRefDocumentResponse>(`${environment.authUrl}/api/processes/${processId}/getRefDocument`);
  }

  public apiProcessesProcessIdUploadsRefPost(processId: string, data: ProcessIdUploadsRefBody): Observable<SuccessResponse> {
    const formData = new FormData();
      formData.append('opswatIds', JSON.stringify(data.opswatIds!));
    formData.append('department_id', data.department_id!);
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${processId}/uploadsRef`, formData);
  }

  public apiProcessesProcessesIdAuthorizationReceiptCertificatePost(processesId: string, data: ProcessesIdAuthorizationReceiptCertificateBody): Observable<ProcessesIdAuthorizationReceiptCertificateResponse> {
    return this.http.post<ProcessesIdAuthorizationReceiptCertificateResponse>(`${environment.authUrl}/api/processes/${processesId}/authorizationReceiptCertificate`, data);
  }

  public apiProcessesSendPaymentsInstructionPost(data: ProcessesSendPaymentsInstructionBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/sendPaymentsInstruction`, data);
  }

  public apiProcessesSetRecordsPost(data: ProcessesSetRecordsBody): Observable<ProcessesSetRecordsResponse> {
    return this.http.post<ProcessesSetRecordsResponse>(`${environment.authUrl}/api/processes/setRecords`, data);
  }

  public apiProcessesTransmitPost(data: ProcessesTransmitBody): Observable<BooleanResultResponse> {
    return this.http.post<BooleanResultResponse>(`${environment.authUrl}/api/processes/transmit`, data);
  }

  public apiProcessesUnlockProcessFilesPost(data: ProcessesUnlockProcessFilesBody): Observable<ProcessesUnlockProcessFilesResponse> {
    return this.http.post<ProcessesUnlockProcessFilesResponse>(`${environment.authUrl}/api/processes/unlockProcessFiles`, data);
  }

  public apiProcessesUpdateDateAndReferencePost(data: ProcessesUpdateDateAndReferenceBody): Observable<UpdateDateAndReferenceResponse> {
    return this.http.post<UpdateDateAndReferenceResponse>(`${environment.authUrl}/api/processes/updateDateAndReference`, data);
  }

  public apiProcessesUpdatePost(data: ProcessesUpdateBody): Observable<any> {
    return this.http.post<any>(`${environment.authUrl}/api/processes/update`, data);
  }
  public apiProcessesUpdateProcessPost(data: ProcessesUpdateProcessBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/updateProcess`, data);
  }

  public apiProcessesUpdateReasonRefundPost(data: ProcessesUpdateReasonRefundBody): Observable<UpdateReasonRefundResponse> {
    return this.http.post<UpdateReasonRefundResponse>(`${environment.authUrl}/api/processes/updateReasonRefund`, data);
  }

  public apiProcessesUpdateTypeProcessPost(data: ProcessesUpdateTypeProcessBody): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/updateTypeProcess`, data);
  }
  public apiDeleteProcess(processesId: string): Observable<string> {
    return this.http.delete<string>(`${environment.authUrl}/api/processes/${processesId}?departmentId=7234`);
  }
}
