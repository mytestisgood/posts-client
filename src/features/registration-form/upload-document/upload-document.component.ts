import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {UploadFileService} from '@shared/api/services';
import {
  AsideProcessDialogComponent,
  DownloadSampleDialogComponent,
  ForwardRequestDialogComponent,
} from '@shared/dialog';
import {
  AllRegistrationSessionData,
  FileUploadStatusAndId,
  FileWithLoading, loginAfterRegistrationLink,
  REGISTRATION_DATA,
  registrationSetPasswordLink,
  registrationTransferMoneyLink,
  UploadDocumentsControls,
  uploadingDocumentsFormMapper,
} from '@shared/entities';
import {getCurrentMonth, getCurrentYear} from '@shared/helpers';
import {AlertsService, DestroyService} from '@shared/services';
import {
  ButtonComponent,
  DatePickerComponent,
  InputFileComponent,
  NotificationComponent,
  SelectComponent,
} from '@shared/ui';
import {SessionStorageService} from '@shared/web-api';
import {TuiAlertService, TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {delay, repeat, skipWhile, startWith, switchMap, take, takeUntil, tap, withLatestFrom} from 'rxjs';
import {iif, of, interval, Subscription} from 'rxjs';
import {ProcessDetails} from "@shared/api/models";


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
  public identifier: string = this.currentStorageData?.identifier as string;
  public departmentId: number = Number(this.currentStorageData.departmentId);
  public inter = interval(5000);

  public sub = new Subscription;
  public process_details: ProcessDetails = {};

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly fb: FormBuilder,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly uploadFileService: UploadFileService,
    private readonly router: Router,
    private readonly alertsService: AlertsService,
  ) {
  }

  public ngOnInit(): void {
    if (this.currentStorageData.files?.length) {
      this.uploadDocumentsForm.setValue({
        files: this.currentStorageData.files,
      });
      this.uploadDocumentsForm.updateValueAndValidity({emitEvent: true});
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
    this.uploadDocumentsForm.updateValueAndValidity({emitEvent: true});
  }

  public removeFile(opsId: string): void {
    this.opswatId = this.opswatId.filter(id => id !== opsId);
  }

  // public requestSend(): void {
  //   // this.sessionStorageService.clear();
  //   // this.router.navigate(['/']);
  //   this.router.navigate([loginAfterRegistrationLink]);
  // }

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
      processName: null,
      year: getCurrentYear().toString(),
    }).pipe(
      tap((res) => {
        if (res?.processId) {
          this.getUploadFile(res.processId);
        } else {
          this.alertsService.showErrorNotificationIcon('הקובץ לא נקלט. יש להעלות את הקובץ מחדש');
        }
      }),
      withLatestFrom(this.dialogs.open(content, {
        closeable: false,
        size: 'm',
      })),
      delay(2000),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public getUploadFile(processId: string): void {
    this.sub = this.inter.pipe(
      startWith(0),
      switchMap(() =>
        iif(() => processId !== undefined && processId !== null,
          this.uploadFileService.apiProcessesUploadFileGet({
            processId,
            department_id: this.currentStorageData.departmentId as string,
          }), of(null),
        ),
      )).subscribe(response => {
      if (response) {
        this.set_process(response);
      }
    });
  }
  public set_process(response: ProcessDetails): void {
    this.process_details = response;
    if (this.process_details.status !== null) {
      switch (this.process_details.status) {
        case 'loading':
          break;
        case 'error_loading':
        case 'loaded_with_errors': {
          this.sub.unsubscribe();
          this.alertsService.showErrorNotificationIcon('יש בעיה בקובץ הקובץ מעובר לטיפול מנהל תיק\n' +
            'יצרו איתך תוך 24 שעות');
          this.sessionStorageService.clear();
          this.router.navigate([loginAfterRegistrationLink]);
          break;
        }
        case 'can_be_processed': {
          setTimeout(() => {
            this.sub.unsubscribe();
              this.currentStorageData.files = this.uploadDocumentsForm.value.files as FileWithLoading[];
              this.currentStorageData.finishFilesPage = true;
              this.currentStorageData.processId = response.id;
              this.currentStorageData.total = response.total;
              this.currentStorageData.employeesCount = response.count_employee;
              this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
              this.router.navigate([registrationTransferMoneyLink]);
              }, 1000);
          break;
        }
      }
    }
  }
}
