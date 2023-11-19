import { CommonModule } from '@angular/common';
import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { AsideProcessDialogComponent } from '@shared/dialog';
import {
  AllRegistrationSessionData, loginAfterRegistrationLink, REGISTRATION_DATA,
  registrationConfirmPaymentLink,
  registrationTransferMoneyLink,
} from '@shared/entities';
import { toBlobAndSaveFile } from '@shared/helpers';
import {AlertsService, DestroyService} from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import {catchError, delay, of, takeUntil, tap, withLatestFrom} from 'rxjs';
import { DownloadPaymentsInstructionResponse, FileDataExtResponse } from '@shared/api/models';
import { ProcessesService } from '@shared/api/services';
import { SessionStorageService } from '@shared/web-api';

@Component({
  selector: 'smarti-payment-instruction-form',
  standalone: true,
  imports: [CommonModule, ButtonComponent, AsideProcessDialogComponent],
  templateUrl: './payment-instruction-form.component.html',
  styleUrls: ['./payment-instruction-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaymentInstructionFormComponent  {
  public isDisabled:boolean = true;
  // private isNeedToNavigateAfterClose: boolean = false;
  private readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

  constructor(
    @Inject(TuiDialogService) private  readonly dialogs: TuiDialogService,
    private readonly router: Router,
    private readonly processesService: ProcessesService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly alertsService: AlertsService,
    private readonly destroy$: DestroyService,
  ) {

  }

  // public ngAfterViewInit(): void {
  //   this.dialogs.pipe(
  //     takeUntil(this.destroy$),
  //   ).subscribe(dialogs => {
  //     if (this.isNeedToNavigateAfterClose && !dialogs.length) {
  //       this.isNeedToNavigateAfterClose = false;
  //       this.router.navigate([registrationConfirmPaymentLink]);
  //     }
  //   });
  // }

  public openDialogForAsideProcess(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public downloadPaymentExample(): void {
    this.isDisabled = false;
    this.processesService.apiProcessesDownloadPaymentsInstructionPost({
      processId: Number(this.currentStorageData.processId),
      department_id: this.currentStorageData.departmentId,
      criteria: {
        isCheckAll: true,
        processId: Number(this.currentStorageData.processId),
        department_id: Number(this.currentStorageData.departmentId),
        limit: 1,
        page: 15,
      },
    }).pipe(
      tap((result: DownloadPaymentsInstructionResponse) => {
          if (result instanceof Array) {
            (result as Array<FileDataExtResponse>).forEach(file => {
              toBlobAndSaveFile(file as FileDataExtResponse);
            });
          } else {
            if (result['message'] === 'the employer should be active') {
              this.alertsService.showErrorNotificationIcon('מעסיק אינו פעיל');
            } else if (result['message'] === 'Payment Type is null!') {
              this.alertsService.showErrorNotificationIcon('לא ניתן להוריד הנחיות לתשלום לרשומות שלא מוגדר להם סוג תשלום');
            } else {
              this.alertsService.showErrorNotificationIcon(result.message as string);
            }
          }
        },
      ),
      catchError((err) => {
        this.alertsService.showErrorNotificationIcon('שגיאה');
        return of(err);
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public navigateToConfirmPayment(content: PolymorpheusContent<TuiDialogContext>): void {
    // this.isNeedToNavigateAfterClose = true;
    const dialogRef = this.dialogs.open(content, {
      closeable: false,
      size: 'm',
    }).pipe(takeUntil(this.destroy$)).subscribe();
    setTimeout(() => {
      dialogRef.closed = true;
      this.router.navigate([registrationConfirmPaymentLink]);
    }, 3000);
  }

  public navigateToTransferMoney(): void {
    this.router.navigate([registrationTransferMoneyLink]);
  }

  public closeDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
