import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { SuccessResponse } from '@shared/api/models';
import { SignInService } from '@shared/api/services';
import { ChangeEmailDialogComponent, SuccessDialogComponent } from '@shared/dialog';
import {
  DEPARTMENT_ID,
  RegistrationDirection,
  RegistrationFormValueType,
  TOKEN,
  VerificationEmailControls,
  verifyEmailFormMapper,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputNumberComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { concatMap, of, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-verify-email',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputNumberComponent,
    SuccessDialogComponent,
    ReactiveFormsModule,
    ChangeEmailDialogComponent,
  ],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Input() public currentFormStateValue!: RegistrationFormValueType;
  @Output() public subformInitialized: EventEmitter<FormGroup<VerificationEmailControls>> =
    new EventEmitter<FormGroup<VerificationEmailControls>>();
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();

  public verifyEmailInfo: FormGroup<VerificationEmailControls> = verifyEmailFormMapper();
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public departmentId: number = Number(this.localStorageService.getItem(DEPARTMENT_ID));
  public currentEmail!: string;
  public control: FormControl = new FormControl();
  public isDisabled: boolean = true;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly fb: FormBuilder,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    if (this.startingForm) {
      this.verifyEmailInfo = this.startingForm;
    }
    this.subformInitialized.emit(this.verifyEmailInfo);
    this.currentEmail = this.currentFormStateValue.personalInfo.email;
    this.verifyEmailInfo.statusChanges.pipe(
      tap((isValid: FormControlStatus) => this.isDisabled = !(isValid === 'VALID')),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public openSuccessDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.signInService.apiUsersCheckVerifyCodePost({
      token: this.token,
      usersCheckVerifyCodeBody: {
        code: this.verifyEmailInfo.controls.emailVerifyCode.value as string,
        departmentId: 6848,
      },
    }).pipe(
      concatMap((result: SuccessResponse) => {
        if (result.message === 'success') {
          return this.dialogs.open(content, {
            closeable: false,
          });
        }
        return of();
      }),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public openModalChangeEmail(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public sendChangeEmailRequest(): void {
    // this.control.value
  }
}
