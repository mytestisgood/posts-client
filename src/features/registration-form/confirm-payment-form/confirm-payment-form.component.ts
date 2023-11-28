import { CommonModule, DatePipe } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, Injector, OnInit} from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountFormDialogComponent } from '@shared/dialog';
import {
  AllRegistrationSessionData,
  ConfirmPaymentControls,
  confirmPaymentFormMapper,
  FileUploadStatusAndId,
  FileWithLoading, IS_LOGGED_IN,
  REGISTRATION_DATA, registrationConfirmPaymentLink, registrationSetPasswordLink,
  registrationVerifyCodeLink, TOKEN,
} from '@shared/entities';
import { AlertsService, DestroyService } from '@shared/services';
import { ButtonComponent, InputDateComponent, InputFileComponent } from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {PolymorpheusComponent, PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {
  catchError,
  debounceTime,
  forkJoin,
  interval,
  map,
  Observable,
  of,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { ProgressBarComponent } from '../../progress-bar/progress-bar.component';
import { ProcessesService } from '@shared/api/services';
import { CreateEmployerOutResponse, ProcessesUpdateBody } from '@shared/api/models';

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
  public confirmPaymentFormChange$: Observable<FormControlStatus> = this.confirmPaymentForm
    .statusChanges.pipe(takeUntil(this.destroy$));
  public readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
  public isDisabled: boolean = false;

  public processesUpdateBody: ProcessesUpdateBody = {};
  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly processesService: ProcessesService,
    private readonly alertsService: AlertsService,
    public datePipe: DatePipe,
  ) {
    this.isDirectPayment = this.currentStorageData.transferMoneyMode !== 'smarti';
    this.isDisabled = this.isDirectPayment;
  }

  public ngOnInit(): void {
    if (this.currentStorageData.paymentFiles?.length) {
      this.confirmPaymentForm.setValue({
        files: this.currentStorageData.paymentFiles,
        date: this.currentStorageData.paymentDate,
      });
      this.confirmPaymentForm.updateValueAndValidity({ emitEvent: true });
    }
    this.isDisabled = !this.confirmPaymentForm.valid;
    this.confirmPaymentFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }

  public fileUploaded(uploadedAndId: FileUploadStatusAndId): void {
    if (uploadedAndId.status && this.confirmPaymentForm.controls.files.value) {
      this.opswatId.push(uploadedAndId.id as string);
    }
    this.documentUploaded = uploadedAndId.status;
  }

  public openDialogAccountForm(content: PolymorpheusContent<TuiDialogContext>): void {

    const dialogRef = this.dialogs.open<number>(
      new PolymorpheusComponent(AccountFormDialogComponent, this.injector),
      {
        data: 237,
        dismissible: true,
        label: 'Heading',
      },
    );
    dialogRef.subscribe(aaa => {
      alert(aaa);
    });
    // const dialogRef = this.dialogs.open(content, {
    //   closeable: false,
    //   size: 'l',
    // }).pipe(takeUntil(this.destroy$)).subscribe({
    //   next: data => {
    //    alert({ data });
    //   },
    //   complete: () => {
    //     console.info('Dialog closed');
    //   },
    // });

    // interval(100).pipe(
    //   map(() => {
    //       if (dialogRef.closed) {
    //         this.isDisabled = false;
    //       }
    //     },
    //   ),
    //   takeWhile(() => this.isDisabled),
    //   takeUntil(this.destroy$)
    // ).subscribe(() => {
    //   // Perform actions when the dialog is open
    // });

  }

  public navigateToVerifyCode(): void {
    if (this.confirmPaymentForm.valid) {
      // const dateFormat = this.datePipe.transform(this.confirmPaymentForm.controls.date.value, 'yyyy-MM-dd');
      // const filesList = this.selectUnit.rows ? this.selectUnit.rows.checkedItems.map(item => item['file_id']) : null;
      this.processesUpdateBody.type = 'date';
      this.processesUpdateBody.processId = this.currentStorageData.processId;
      this.processesUpdateBody.params = this.confirmPaymentForm.controls.date.value;
      this.processesUpdateBody.inProcess = true;
      const updateProcessDate$ = this.processesService.apiProcessesUpdatePost(this.processesUpdateBody);

      if (this.opswatId.length > 0) {
        const uploadsRef$ = this.processesService.apiProcessesProcessIdUploadsRefPost(this.currentStorageData.processId!, {
          opswatIds: this.opswatId,
          department_id: this.currentStorageData.departmentId,
        });
      }

      forkJoin([updateProcessDate$]).pipe(
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
      ).subscribe();
    }
  }
}
