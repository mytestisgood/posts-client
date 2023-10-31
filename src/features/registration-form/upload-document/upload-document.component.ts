import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFileService } from '@shared/api/services';
import {
  AsideProcessDialogComponent,
  DownloadSampleDialogComponent,
  ForwardRequestDialogComponent,
} from '@shared/dialog';
import {
  AllRegistrationSessionData,
  FileUploadStatusAndId,
  FileWithLoading,
  REGISTRATION_DATA,
  registrationSetPasswordLink,
  registrationTransferMoneyLink,
  UploadDocumentsControls,
  uploadingDocumentsFormMapper,
} from '@shared/entities';
import { getCurrentMonth, getCurrentYear } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  DatePickerComponent,
  InputFileComponent,
  NotificationComponent,
  SelectComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { TuiAlertService, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { delay, takeUntil, tap, withLatestFrom } from 'rxjs';

@Component({
  selector: 'smarti-upload-document',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerComponent,
    SelectComponent,
    InputFileComponent,
    ForwardRequestDialogComponent,
    NotificationComponent,
    ButtonComponent,
    ReactiveFormsModule,
    DownloadSampleDialogComponent,
    AsideProcessDialogComponent,
  ],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentComponent implements OnInit {
  public uploadDocumentsForm: FormGroup<UploadDocumentsControls> = uploadingDocumentsFormMapper();
  public documentUploaded: boolean = false;
  public opswatId: Array<string> = [];
  public currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
  public identifier: string = this.currentStorageData?.companyId as string;
  public departmentId: number = Number(this.currentStorageData.departmentId);

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly fb: FormBuilder,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly uploadFileService: UploadFileService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    if (this.currentStorageData.files?.length) {
      this.uploadDocumentsForm.setValue({
        files: this.currentStorageData.files,
      });
      this.uploadDocumentsForm.updateValueAndValidity({ emitEvent: true });
    }
  }

  public openForwardModal(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public fileUploaded(uploadedAndId: FileUploadStatusAndId): void {
    if (uploadedAndId.status && this.uploadDocumentsForm.controls.files.value) {
      this.opswatId.push(uploadedAndId.id as string);
    }
    this.documentUploaded = uploadedAndId.status;
    this.uploadDocumentsForm.updateValueAndValidity({ emitEvent: true });
  }

  public requestSend(): void {
    this.router.navigate([registrationTransferMoneyLink]);
  }

  public navigateToRegistrationInfo(): void {
    this.router.navigate([registrationSetPasswordLink]);
  }

  public openSampleDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public openDialogForAsideProcess(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public navigateToTransferMoney(content: PolymorpheusContent<TuiDialogContext>): void {
    this.uploadFileService.apiProcessesUploadFilePost({
      departmentId: this.currentStorageData.departmentId,
      opswatIds: this.opswatId,
      isDepartmentLink: false,
      isDirect: false,
      isEmployer: true,
      month: getCurrentMonth().toString(),
      processName: 'upload file from',
      year: getCurrentYear().toString(),
    }).pipe(
      tap(() => {
        this.currentStorageData.files = this.uploadDocumentsForm.value.files as FileWithLoading[];
        this.currentStorageData.finishFilesPage = true;
        this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
        this.router.navigate([registrationTransferMoneyLink]);
      }),
      withLatestFrom(this.dialogs.open(content, {
        closeable: false,
        size: 'm',
      })),
      delay(2000),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
