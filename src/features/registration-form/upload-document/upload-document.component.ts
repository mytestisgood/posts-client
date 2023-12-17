import {CommonModule} from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject, OnDestroy, OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ProcessesService, SignInService, UploadFileService} from '@shared/api/services';
import {
  AsideProcessDialogComponent,
  DownloadSampleDialogComponent,
  ForwardRequestDialogComponent,
} from '@shared/dialog';
import {
  AllRegistrationSessionData, CURRENT_USER,
  FileUploadStatusAndId,
  FileWithLoading, IS_LOGGED_IN, loginAfterRegistrationLink,
  REGISTRATION_DATA, registrationInfoLink,
  registrationSetPasswordLink,
  registrationTransferMoneyLink, TOKEN,
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
import {
  delay,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
  iif,
  of,
  interval,
  Subscription,
  catchError
} from 'rxjs';
import {ProcessDetails, SignInResponse} from '@shared/api/models';
import {isMobile} from '@shared/helpers';


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
  public isMobile = isMobile
  public customWidth = this.isMobile? '320px': '536px'
  public uploadDocumentsForm: FormGroup<UploadDocumentsControls> = uploadingDocumentsFormMapper();
  public documentUploaded: boolean = false;
  public dialogRef: any;
  public opswatId: Array<string> = [];
  public currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
  public identifier: string = this.currentStorageData?.identifier as string;
  public departmentId: number = Number(this.currentStorageData.departmentId);
  public inter = interval(5000);
  public currentFilesArray: FileWithLoading[] = [];
  public sub = new Subscription;
  public is_file = false;

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly fb: FormBuilder,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,

    private readonly sessionStorageService: SessionStorageService,
    private readonly uploadFileService: UploadFileService,
    private readonly router: Router,
    private readonly alertsService: AlertsService,
    private readonly processesService: ProcessesService,
  ) {
  }

  public ngOnInit(): void {
    setTimeout(() => {
      if (this.currentStorageData.files?.length) {
        this.currentStorageData.files?.forEach(item => {
          const file = new File([], item.name,
            {type: item?.type});
          this.fileIncrease(file as FileWithLoading);
        });
        this.uploadDocumentsForm.setValue({
          files: this.currentFilesArray,
        });
        // this.documentUploaded = true;
        this.uploadDocumentsForm.updateValueAndValidity({emitEvent: true});
        this.is_file = true;
      }
    }, 100);
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
    if (this.is_file) {
      this.deleteFile();
    }
    this.opswatId = this.opswatId.filter(id => id !== opsId);
  }

  public navigateToRegistrationInfo(): void {
    if (this.currentStorageData.password === 'can not change')
      this.router.navigate([registrationInfoLink]);
    else this.router.navigate([registrationSetPasswordLink])
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
    if (!this.is_file) {
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
        switchMap(() => {
          this.dialogRef = this.dialogs.open(content, {
            closeable: false,
            size: 'm',
          }).pipe(takeUntil(this.destroy$)).subscribe();
          return this.dialogRef;
        }),
        takeUntil(this.destroy$),
      ).subscribe();
    } else {
      this.router.navigate([registrationTransferMoneyLink]);
    }
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
    if (response.status !== null) {
      switch (response.status) {
        case 'loading':
          break;
        case 'error_loading':
        case 'loaded_with_errors': {
          this.dialogRef.complete();
          this.sub.unsubscribe();
          this.alertsService.showErrorNotificationIcon('יש בעיה בקובץ הקובץ מעובר לטיפול מנהל תיק\n' +
            'יצרו איתך תוך 24 שעות');
          this.sessionStorageService.clear();
          this.router.navigate(['/']);
          break;
        }
        case 'can_be_processed': {
          this.dialogRef.complete();
          setTimeout(() => {
            this.sub.unsubscribe();
            this.currentStorageData.files = [];
            this.uploadDocumentsForm.value.files?.forEach(file1 => {
              this.currentStorageData.files?.push(<FileWithLoading>{
                name: file1.name,
                type: file1.type,
                size: file1.size,
                isLoading: file1?.isLoading,
                isUploaded: file1?.isUploaded,
                index: file1?.index,
                opsId: file1?.opsId,
              });
            });
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

  private fileIncrease(file: FileWithLoading): void {
    this.currentFilesArray.push(file);
    const index: number = this.currentFilesArray.length - 1;
    if (!this.currentFilesArray[index].isUploaded) {
      this.currentFilesArray[index].isLoading = true;
      this.currentFilesArray[index].isUploaded = true;
      this.currentFilesArray[index].index = index;
    }
  }

  private deleteFile() {
    this.uploadDocumentsForm.controls.files.setValue([])
    this.opswatId = []
    this.is_file = false
    this.processesService.apiDeleteProcess(this.currentStorageData.processId as string).pipe().subscribe(() => {
      delete this.currentStorageData.files;
      delete this.currentStorageData.finishFilesPage;
      delete this.currentStorageData.employeesCount;
      delete this.currentStorageData.processId;
      delete this.currentStorageData.total;
      delete this.currentStorageData.finishConfirmPayment;
      delete this.currentStorageData.paymentFiles;
      const updatedDataString = JSON.stringify(this.currentStorageData);
      sessionStorage.setItem('registrationData', updatedDataString)
    });
  }

}
