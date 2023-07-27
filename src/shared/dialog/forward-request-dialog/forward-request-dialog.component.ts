import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignInService } from '@shared/api';
import { DestroyService } from '@shared/services';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ButtonComponent, InputFieldComponent, InputNumberComponent } from '@shared/ui';

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
  @Output() public requestSend: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public forwardRequestForm: FormGroup<ForwardRequestForm> = new FormGroup({
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    userName: new FormControl(''),
  });

  constructor(
    private destroy$: DestroyService,
    private signInService: SignInService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(): void {
    this.signInService.apiEmployersCreateUserOutPost({
      email: this.forwardRequestForm.controls.email.value as string,
      phone: this.forwardRequestForm.controls.phone.value as string,
      user_name: this.forwardRequestForm.controls.userName.value as string,
    }).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.requestSend.next(true);
      this.observer.complete();
    })
  }
}
