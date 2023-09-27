import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  BooleanResultResponse,
  ChangeFileToNegativeParameters,
  CheckIsDateParameters,
  CheckIsDateResponse,
  DownloadPaymentsInstructionParameters,
  DownloadPaymentsInstructionResponse,
  EmployerIdGetCommentBroadcastParameters,
  FilesListGetResponse,
  ProcessesFilesListGetParameters,
  ProcessesIdAuthorizationReceiptCertificateParameters,
  ProcessesIdAuthorizationReceiptCertificateResponse,
  ProcessesParameters,
  ProcessesSetRecordsParameters,
  ProcessesSetRecordsResponse,
  ProcessesTransmitParameters,
  ProcessesUnlockProcessFilesResponse,
  ProcessesUpdateParameters,
  ProcessIdDeleteParameters,
  ProcessIdDeleteRefDocumentPostParameters,
  ProcessIdDownloadFileGetParameters,
  ProcessIdDownloadFileGetResponse,
  ProcessIdDownloadRefDocumentParameters,
  ProcessIdDownloadRefDocumentResponse,
  ProcessIdGetRefDocumentGeParameters,
  ProcessIdGetRefDocumentResponse,
  ProcessIdUploadsRefParameters,
  ProcessResponse,
  SendPaymentsInstructionParameters,
  SuccessResponse,
  UnlockProcessFilesParameters,
  UpdateDateAndReferenceParameters,
  UpdateDateAndReferenceResponse,
  UpdateProcessParameters,
  UpdateReasonRefundParameters,
  UpdateReasonRefundResponse,
  UpdateTypeProcessParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProcessesService {
  constructor(private http: HttpClient) {
  }

  public apiProcessesChangeFileToNegativePost(data: ChangeFileToNegativeParameters): Observable<BooleanResultResponse> {
    return this.http.post<BooleanResultResponse>(`${environment.authUrl}/api/processes/changeFileToNegative/`, data);
  }

  public apiProcessesCheckIsDatePost(data: CheckIsDateParameters): Observable<CheckIsDateResponse> {
    return this.http.post<CheckIsDateResponse>(`${environment.authUrl}/api/processes/checkIsDate/`, data);
  }

  public apiProcessesDownloadPaymentsInstructionPost(data: DownloadPaymentsInstructionParameters): Observable<DownloadPaymentsInstructionResponse> {
    return this.http.post<DownloadPaymentsInstructionResponse>(`${environment.authUrl}/api/processes/downloadPaymentsInstruction/`, data);
  }

  public apiProcessesEmployerIdGetCommentBroadcastGet(data: EmployerIdGetCommentBroadcastParameters): Observable<string> {
    return this.http.post<string>(`${environment.authUrl}/api/processes/${data.employerId}/getCommentBroadcast/`, data);
  }

  public apiProcessesFilesListGet(data: ProcessesFilesListGetParameters): Observable<FilesListGetResponse> {
    return this.http.get<FilesListGetResponse>(`${environment.authUrl}/api/processes/filesList/`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesGet(data: ProcessesParameters): Observable<ProcessResponse> {
    return this.http.get<ProcessResponse>(`${environment.authUrl}/api/processes/`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesProcessIdDelete(data: ProcessIdDeleteParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${data.processId}`, data);
  }

  public apiProcessesProcessIdDeleteRefDocumentPost(data: ProcessIdDeleteRefDocumentPostParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${data.processId}/deleteRefDocument/`, data);
  }

  public apiProcessesProcessIdDownloadFileProcessGet(data: ProcessIdDownloadFileGetParameters): Observable<ProcessIdDownloadFileGetResponse> {
    return this.http.get<ProcessIdDownloadFileGetResponse>(`${environment.authUrl}/api/processes/${data.processId}/downloadFileProcess/`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesProcessIdDownloadRefDocumentPost(data: ProcessIdDownloadRefDocumentParameters): Observable<ProcessIdDownloadRefDocumentResponse> {
    return this.http.post<ProcessIdDownloadRefDocumentResponse>(`${environment.authUrl}/api/processes/${data.processId}/downloadRefDocument/`, data);
  }

  public apiProcessesProcessIdGetRefDocumentGet(data: ProcessIdGetRefDocumentGeParameters): Observable<ProcessIdGetRefDocumentResponse> {
    return this.http.get<ProcessIdGetRefDocumentResponse>(`${environment.authUrl}/api/processes/${data.processId}/getRefDocument/`, { params: createObjectHttpParams(data) });
  }

  public apiProcessesProcessIdUploadsRefPost(data: ProcessIdUploadsRefParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/${data.processId}/uploadsRef/`, data);
  }

  public apiProcessesProcessesIdAuthorizationReceiptCertificatePost(data: ProcessesIdAuthorizationReceiptCertificateParameters): Observable<ProcessesIdAuthorizationReceiptCertificateResponse> {
    return this.http.post<ProcessesIdAuthorizationReceiptCertificateResponse>(`${environment.authUrl}/api/processes/${data.processesId}/authorizationReceiptCertificate/`, data);
  }

  public apiProcessesSendPaymentsInstructionPost(data: SendPaymentsInstructionParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/sendPaymentsInstruction/`, data);
  }

  public apiProcessesSetRecordsPost(data: ProcessesSetRecordsParameters): Observable<ProcessesSetRecordsResponse> {
    return this.http.post<ProcessesSetRecordsResponse>(`${environment.authUrl}/api/processes/setRecords/`, data);
  }

  public apiProcessesTransmitPost(data: ProcessesTransmitParameters): Observable<BooleanResultResponse> {
    return this.http.post<BooleanResultResponse>(`${environment.authUrl}/api/processes/transmit/`, data);
  }

  public apiProcessesUnlockProcessFilesPost(data: UnlockProcessFilesParameters): Observable<ProcessesUnlockProcessFilesResponse> {
    return this.http.post<ProcessesUnlockProcessFilesResponse>(`${environment.authUrl}/api/processes/unlockProcessFiles/`, data);
  }

  public apiProcessesUpdateDateAndReferencePost(data: UpdateDateAndReferenceParameters): Observable<UpdateDateAndReferenceResponse> {
    return this.http.post<UpdateDateAndReferenceResponse>(`${environment.authUrl}/api/processes/updateDateAndReference/`, data);
  }

  public apiProcessesUpdatePost(data: ProcessesUpdateParameters): Observable<string> {
    return this.http.post<string>(`${environment.authUrl}/api/processes/update/`, data);
  }

  public apiProcessesUpdateProcessPost(data: UpdateProcessParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/updateProcess/`, data);
  }

  public apiProcessesUpdateReasonRefundPost(data: UpdateReasonRefundParameters): Observable<UpdateReasonRefundResponse> {
    return this.http.post<UpdateReasonRefundResponse>(`${environment.authUrl}/api/processes/updateReasonRefund/`, data);
  }

  public apiProcessesUpdateTypeProcessPost(data: UpdateTypeProcessParameters): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>(`${environment.authUrl}/api/processes/updateTypeProcess/`, data);
  }
}