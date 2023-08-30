import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UploadFileService } from '@shared/api';
import { ForwardRequestDialogComponent } from '@shared/dialog';
import {
  DEPARTMENT_ID,
  RegistrationDirection,
  REGISTRATION_TOKEN,
  RegistrationFormValueType,
  UploadDocumentsControls,
  uploadingDocumentsFormMapper,
} from '@shared/entities';
import { downloadFileHelper } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  DatePickerComponent,
  InputFileComponent,
  NotificationComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

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
  ],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Input() public currentFormStateValue!: RegistrationFormValueType;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();
  public uploadDocumentsForm: FormGroup<UploadDocumentsControls> = uploadingDocumentsFormMapper();
  public documentUploaded: boolean = false;
  public isSendRequest: boolean = false;
  public isNotificationClosed: boolean = false;
  public departmentId: number = Number(this.localStorageService.getItem(DEPARTMENT_ID));
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public identifier!: string;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly fb: FormBuilder,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
    private readonly localStorageService: LocalStorageService,
    private readonly uploadFileService: UploadFileService,
  ) {
  }

  public ngOnInit(): void {
    if (this.startingForm) {
      this.uploadDocumentsForm = this.startingForm;
    }
    this.subformInitialized.emit(this.uploadDocumentsForm);
    this.identifier = this.currentFormStateValue.personalInfo.companyId;
  }

  public doChangeStep(direction: RegistrationDirection): void {
    this.subformInitialized.emit(this.uploadDocumentsForm);
    this.uploadFileService.apiProcessesUploadFilePost(this.token, {})
      .pipe(takeUntil(this.destroy$)).subscribe(() => this.changeStep.emit(direction));
  }

  public downloadXlExample(): void {
    downloadFileHelper('/assets/files/דוגמה.xlsx', 'דוגמה.xlsx');
  }

  public openForwardModal(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public fileUploaded(isUploaded: boolean): void {
    this.documentUploaded = isUploaded;
  }

  public requestSend(isSend: boolean): void {
    this.isSendRequest = isSend;
    this.changeDetectionRef.detectChanges();
  }

  public closeNotification(isClosed: boolean): void {
    this.isNotificationClosed = isClosed;
  }
}
