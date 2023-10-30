import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UploadFileService } from '@shared/api/services';
import {
  AsideProcessDialogComponent,
  DownloadSampleDialogComponent,
  ForwardRequestDialogComponent,
} from '@shared/dialog';
import {
  DEPARTMENT_ID,
  FileUploadStatusAndId,
  registrationSetPasswordLink,
  registrationTransferMoneyLink,
  TOKEN,
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
export class UploadDocumentComponent {
  public uploadDocumentsForm: FormGroup<UploadDocumentsControls> = uploadingDocumentsFormMapper();
  public documentUploaded: boolean = false;
  public departmentId: number = Number(this.sessionStorageService.getItem(DEPARTMENT_ID));
  public token: string = this.sessionStorageService.getItem(TOKEN) as string;
  public identifier!: string;
  public opswatId: Array<string> = [];

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
      departmentId: this.departmentId.toString(),
      opswatIds: this.opswatId,
      isDepartmentLink: false,
      isDirect: false,
      isEmployer: true,
      month: getCurrentMonth().toString(),
      processName: 'upload file from',
      year: getCurrentYear().toString(),
    }).pipe(
      tap(() => this.router.navigate([registrationTransferMoneyLink])),
      withLatestFrom(this.dialogs.open(content, {
        closeable: false,
        size: 'm',
      })),
      delay(2000),
      takeUntil(this.destroy$),
    ).subscribe();
  }
}
