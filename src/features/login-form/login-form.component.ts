import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {SignInResponse, StepUserEnum} from '@shared/api/models';
import { SignInService } from '@shared/api/services';
import {CURRENT_USER, DocumentTypesEnumEmployer, emailValidatorPattern, IS_LOGGED_IN, TOKEN} from '@shared/entities';
import {AlertsService, DestroyService} from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputPasswordComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import {catchError, Observable, of, takeUntil, tap, throwError} from 'rxjs';
import * as querystring from "querystring";
import {getObjectKeyByValue} from "@shared/helpers";

interface LoginForm {
  email: FormControl<string | null>
  password: FormControl<string | null>
  isRemember: FormControl<boolean | null>
}

@Component({
  selector: 'smarti-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    InputPasswordComponent,
    InputCheckboxComponent,
    ButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(emailValidatorPattern),
    ]),
    password: new FormControl('', [Validators.required]),
    isRemember: new FormControl(false),
  });
  public isDisabled: boolean = true;
  public loginFormChange$:Observable<FormControlStatus> = this.loginForm.statusChanges.pipe(
    tap((isValid: FormControlStatus) => this.isDisabled = !(isValid === 'VALID')),
    takeUntil(this.destroy$),
  );
  public step: string[] = Object.values(StepUserEnum);

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly alertsService: AlertsService,
  ) {
  }

  public ngOnInit(): void {
    this.loginFormChange$.subscribe();
  }

  public navigateToRestorePassword(): void {
    this.router.navigate(['/reset-password']);
  }

  public doLogin(): void {
    this.signInService.apiLoginPost({
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    }).pipe(
      catchError((err) => {
        const MESSAGE_ERROR = 'Unauthenticated: invalid email or password';
        if ((err.error !== undefined && err.error.message === MESSAGE_ERROR) || err.message === MESSAGE_ERROR) {
          this.alertsService.showErrorNotificationIcon('שם המשתמש או הסיסמה שגויים');
        }
        else {
          this.alertsService.showErrorNotificationIcon('שגיאה');
        }
        return of(err);
      }),
      takeUntil(this.destroy$),
    ).subscribe((response:SignInResponse) => {
      const step: StepUserEnum = response.user?.step as StepUserEnum;
      if (response.role === 'employer') {
      if(step === 'finish') {
        this.sessionStorageService.setItem(TOKEN, response.token as string);
        this.sessionStorageService.setItem(CURRENT_USER, JSON.stringify(response.user));
        this.sessionStorageService.setItem(IS_LOGGED_IN, 'true');
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      }
      else this.router.navigate(['/registration/','upload-file'],{ queryParams: { 'isContinue': true , 'token': response.token as string}})
      } else {
        throw new Error('Unauthenticated: invalid email or password');
        // throwError(() => new Error('Unauthenticated: invalid email or password'));
      }
    });
  }
}
