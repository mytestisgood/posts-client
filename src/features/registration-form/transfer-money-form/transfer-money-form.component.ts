import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GetBankDetailsSmartiResponse } from '@shared/api/models';
import { EmployeesService } from '@shared/api/services';
import { AsideProcessDialogComponent, BankDetailsDialogComponent } from '@shared/dialog';
import {
  AllRegistrationSessionData,
  REGISTRATION_DATA,
  registrationPaymentInstructionLink,
  registrationUploadFileLink,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFieldComponent,
  RadioBlockComponent,
  SelectComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { Observable, takeUntil } from 'rxjs';
import {
  PaymentInstructionFormComponent,
} from '../payment-instruction-form/payment-instruction-form.component';

@Component({
  selector: 'smarti-transfer-money-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    ButtonComponent,
    RadioBlockComponent,
    InputFieldComponent,
    PaymentInstructionFormComponent,
    AsideProcessDialogComponent,
    BankDetailsDialogComponent,
  ],
  templateUrl: './transfer-money-form.component.html',
  styleUrls: ['./transfer-money-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferMoneyFormComponent {
  public readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
  public departmentId: string = this.currentStorageData.departmentId as string;
  public getBankDetailsSmarti$: Observable<GetBankDetailsSmartiResponse> =
    this.employeesService.apiEmployeesGetBankDetailsSmarti({ department_id: this.departmentId });
  public items: { name: string }[] = [{ name: 'smarti' }, { name: 'directly' }];
  public radioValue: FormControl<{ name: string } | null> = new FormControl(this.items[0]);

  constructor(
    private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly employeesService: EmployeesService,
    private readonly sessionStorageService: SessionStorageService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {
  }

  public navigateToNextPageOrOpenDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.currentStorageData.transferMoneyMode = this.radioValue.value?.name as string;
    this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
    if (this.radioValue.value?.name === 'smarti') {
      this.dialogs.open(content, {
        closeable: false,
        size: 'l',
      }).pipe(takeUntil(this.destroy$)).subscribe();
    } else {
      this.router.navigate([registrationPaymentInstructionLink]);
    }
  }

  public navigateToUploadFile(): void {
    this.router.navigate([registrationUploadFileLink]);
  }

  public openDialogForAsideProcess(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
