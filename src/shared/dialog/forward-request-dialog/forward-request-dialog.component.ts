import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '@shared/api/services';
import { emailValidatorPattern, israelMobilePhoneValidatorPattern } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent, InputNumberComponent } from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { BehaviorSubject, takeUntil, tap, withLatestFrom } from 'rxjs';

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
    phone: new FormControl('', [Validators.required, Validators.pattern(israelMobilePhoneValidatorPattern)]),
    userName: new FormControl(''),
  });

  constructor(
    private readonly destroy$: DestroyService,
    private readonly userService: UserService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
  ) {
  }

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(content: PolymorpheusContent<TuiDialogContext>): void {
    this.userService.apiEmployersCreateUserOutPost({
      email: this.forwardRequestForm.controls.email.value as string,
      phone: this.forwardRequestForm.controls.phone.value as string,
      user_name: this.forwardRequestForm.controls.userName.value as string,
      identifier: this.identifier,
      departmentId: this.departmentId,
    }).pipe(
      tap(() => {
        this.requestSend.next(true);
        this.observer.complete();
      }),
      withLatestFrom(this.dialogs.open(content, {
        closeable: false,
        size: 'm',
      })),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public closeSecondDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
