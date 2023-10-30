import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountControls, paymentMethodFormMapper } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
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

constructor(private readonly destroy$: DestroyService) {
}
  public ngOnInit(): void {
    this.accountForm.updateValueAndValidity({ emitEvent: true });
    this.accountFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }

  public sendRequest(): void {
    this.observer.complete();
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
