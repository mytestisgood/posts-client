import {CommonModule, DatePipe} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AccountFormDialogComponent} from '@shared/dialog';
import {
  AllRegistrationSessionData,
  ConfirmPaymentControls,
  confirmPaymentFormMapper,
  FileUploadStatusAndId,
  FileWithLoading, IS_LOGGED_IN,
  REGISTRATION_DATA, registrationSetPasswordLink,
  registrationVerifyCodeLink, TOKEN,
} from '@shared/entities';
import {AlertsService, DestroyService} from '@shared/services';
import {ButtonComponent, InputDateComponent, InputFileComponent} from '@shared/ui';
import {SessionStorageService} from '@shared/web-api';
import {TuiDialogContext, TuiDialogService} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {catchError, debounceTime, forkJoin, of, takeUntil, tap} from 'rxjs';
import {ProgressBarComponent} from '../../progress-bar/progress-bar.component';
import {ProcessesService} from "@shared/api/services";
import {CreateEmployerOutResponse, ProcessesUpdateBody} from "@shared/api/models";

@Component({
  selector: 'smarti-confirm-payment-form',
  standalone: true,
  imports: [
    CommonModule, ProgressBarComponent, InputFileComponent, ButtonComponent,
    AccountFormDialogComponent, InputDateComponent, ReactiveFormsModule,
  ],
  templateUrl: './confirm-payment-form.component.html',
  styleUrls: ['./confirm-payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentFormComponent implements OnInit {
  public currentUrl: string = this.router.url;
  public confirmPaymentForm: FormGroup<ConfirmPaymentControls> = confirmPaymentFormMapper();
  public opswatId: Array<string> = [];
  public documentUploaded: boolean = false;
  public isDirectPayment: boolean = false;
  public readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

  public processesUpdateBody: ProcessesUpdateBody = {};
  public updateProcessDate$ = this.processesService.apiProcessesUpdatePost(this.processesUpdateBody);
  public uploadsRef$ = this.processesService.apiProcessesProcessIdUploadsRefPost(this.currentStorageData.processId!, {
    opswatIds: this.opswatId,
    department_id: this.currentStorageData.departmentId,
  });

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly processesService: ProcessesService,
    private readonly alertsService: AlertsService,
    public datePipe: DatePipe,
  ) {
    this.isDirectPayment = this.currentStorageData.transferMoneyMode !== 'smarti';
  }

  public ngOnInit(): void {
    if (this.currentStorageData.paymentFiles?.length) {
      this.confirmPaymentForm.setValue({
        files: this.currentStorageData.paymentFiles,
        date: this.currentStorageData.paymentDate,
      });
      this.confirmPaymentForm.updateValueAndValidity({emitEvent: true});
    }
  }

  public fileUploaded(uploadedAndId: FileUploadStatusAndId): void {
    if (uploadedAndId.status && this.confirmPaymentForm.controls.files.value) {
      this.opswatId.push(uploadedAndId.id as string);
    }
    this.documentUploaded = uploadedAndId.status;
  }

  public openDialogAccountForm(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public navigateToVerifyCode(): void {
    // const dateFormat = this.datePipe.transform(this.confirmPaymentForm.controls.date.value, 'yyyy-MM-dd');
    // const filesList = this.selectUnit.rows ? this.selectUnit.rows.checkedItems.map(item => item['file_id']) : null;
    this.processesUpdateBody.type = 'date';
    this.processesUpdateBody.processId = this.currentStorageData.processId;
    this.processesUpdateBody.params = this.confirmPaymentForm.controls.date.value;
    forkJoin([this.updateProcessDate$, this.uploadsRef$]).pipe(
      tap((response) => {
        if (response) {
          this.currentStorageData.paymentFiles = this.confirmPaymentForm.value.files as FileWithLoading[];
          this.currentStorageData.paymentDate = this.confirmPaymentForm.value.date;
          this.currentStorageData.finishConfirmPayment = true;
          this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
          this.router.navigate([registrationVerifyCodeLink]);
        }
      }),
      catchError((err) => {
        this.alertsService.showErrorNotificationIcon('שגיאה');
        return of(err);
      }),
    ).subscribe(() => this.router.navigate([registrationVerifyCodeLink]));
  }
}
