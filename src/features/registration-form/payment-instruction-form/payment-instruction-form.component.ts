import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsideProcessDialogComponent } from '@shared/dialog';
import {
  AllRegistrationSessionData, REGISTRATION_DATA,
  registrationConfirmPaymentLink,
  registrationTransferMoneyLink,
} from '@shared/entities';
import { toBlobAndSaveFile } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil, tap } from 'rxjs';
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
export class PaymentInstructionFormComponent implements AfterViewInit {

  private isNeedToNavigateAfterClose: boolean = false;
  private readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);



  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    private readonly router: Router,
    private readonly processesService: ProcessesService,
    private readonly sessionStorageService: SessionStorageService,

    private readonly destroy$: DestroyService,
  ) {

  }

  public ngAfterViewInit(): void {
    this.dialogs.pipe(
      takeUntil(this.destroy$),
    ).subscribe(dialogs => {
      if (this.isNeedToNavigateAfterClose && !dialogs.length) {
        this.isNeedToNavigateAfterClose = false;
        this.router.navigate([registrationConfirmPaymentLink]);
      }
    });
  }

  public openDialogForAsideProcess(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public downloadPaymentExample(): void {
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
      tap((result: DownloadPaymentsInstructionResponse) => toBlobAndSaveFile(result?.result as FileDataExtResponse)),
      takeUntil(this.destroy$),
    ).subscribe();  }

  public navigateToConfirmPayment(content: PolymorpheusContent<TuiDialogContext>): void {
    this.isNeedToNavigateAfterClose = true;
    this.dialogs.open(content, {
      closeable: false,
      size: 'm',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public navigateToTransferMoney(): void {
    this.router.navigate([registrationTransferMoneyLink]);
  }

  public closeDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
