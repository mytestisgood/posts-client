import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GetBankDetailsSmartiResponse } from '@shared/api/models';
import { EmployeesService } from '@shared/api/services';
import { AsideProcessDialogComponent, BankDetailsDialogComponent } from '@shared/dialog';
import {
  DEPARTMENT_ID,
  RegistrationDirection,
  RegistrationFormValueType,
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
import { LocalStorageService } from '@shared/web-api';
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
  @Input() public startingForm!: FormGroup;
  @Input() public currentFormStateValue!: RegistrationFormValueType;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();

  public departmentId: string = this.localStorageService.getItem(DEPARTMENT_ID) as string;
  public getBankDetailsSmarti$: Observable<GetBankDetailsSmartiResponse> =
    this.employeesService.apiEmployeesGetBankDetailsSmarti({ department_id: this.departmentId });
  public items: { name: string }[] = [{ name: 'smarti' }, { name: 'directly' }];
  public radioValue: FormControl<{ name: string } | null> = new FormControl(this.items[0]);

  constructor(
    private readonly destroy$: DestroyService,
    private readonly router: Router,
    private readonly employeesService: EmployeesService,
    private readonly localStorageService: LocalStorageService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {
  }

  public navigateToNextPageOrOpenDialog(content: PolymorpheusContent<TuiDialogContext>): void {
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
