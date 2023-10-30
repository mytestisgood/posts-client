import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  AccountControls,
  AllRegistrationSessionData,
  paymentMethodFormMapper,
  REGISTRATION_DATA,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-account-form-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './account-form-dialog.component.html',
  styleUrls: ['./account-form-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormDialogComponent implements OnInit {
  @Input() public observer!: { complete: () => void };
  public accountForm: FormGroup<AccountControls> = paymentMethodFormMapper();
  public isDisabled: boolean = true;
  public accountFormChange$: Observable<FormControlStatus> = this.accountForm
    .statusChanges.pipe(takeUntil(this.destroy$));
  private readonly currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

constructor(
  private readonly destroy$: DestroyService,
  private readonly sessionStorageService: SessionStorageService,
) {
}
  public ngOnInit(): void {
    this.accountForm.updateValueAndValidity({ emitEvent: true });
    this.accountFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }

  public sendRequest(): void {
    this.currentStorageData.bankName = this.accountForm.value.bankName as string;
    this.currentStorageData.accountNumber = this.accountForm.value.branchNumber as string;
    this.currentStorageData.branchNumber = this.accountForm.value.branchNumber as string;
    this.observer.complete();
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
