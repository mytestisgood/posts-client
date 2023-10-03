import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterService } from '@shared/api/services';
import { emailValidatorPattern } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent, InputNumberComponent } from '@shared/ui';
import { BehaviorSubject, takeUntil } from 'rxjs';

interface ForwardRequestForm {
  email: FormControl<string | null>;
  phone: FormControl<string | null>;
  userName: FormControl<string | null>;
}

@Component({
  selector: 'smarti-forward-request-dialog',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ButtonComponent,
    ReactiveFormsModule,
    InputNumberComponent,
  ],
  templateUrl: './forward-request-dialog.component.html',
  styleUrls: ['./forward-request-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForwardRequestDialogComponent {
  @Input() public haveCloseIcon: boolean = false;
  @Input() public observer!: { complete: () => void };
  @Input() public identifier!: string;
  @Input() public departmentId!: number;
  @Output() public requestSend: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public forwardRequestForm: FormGroup<ForwardRequestForm> = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    phone: new FormControl('', [Validators.required]),
    userName: new FormControl(''),
  });

  constructor(
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(): void {
    this.registerService.apiEmployersCreateUserOutPost({
      email: this.forwardRequestForm.controls.email.value as string,
      phone: this.forwardRequestForm.controls.phone.value as string,
      user_name: this.forwardRequestForm.controls.userName.value as string,
      identifier: this.identifier,
      departmentId: this.departmentId,
    }).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.requestSend.next(true);
      this.observer.complete();
    });
  }
}
