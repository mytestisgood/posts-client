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
import { SignInResponse } from '@shared/api/models';
import { SignInService } from '@shared/api/services';
import { CURRENT_USER, emailValidatorPattern, IS_LOGGED_IN, TOKEN } from '@shared/entities';
import { DestroyService, LoginService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputPasswordComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { Observable, takeUntil, tap } from 'rxjs';

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

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly loginService: LoginService,
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
      tap((response: SignInResponse) => {
        this.sessionStorageService.setItem(TOKEN, response.token as string);
        this.loginService.currentToken$.next(response.token as string);
        this.sessionStorageService.setItem(IS_LOGGED_IN, 'true');
        this.loginService.isUserLogin$.next('true');
        this.sessionStorageService.setItem(CURRENT_USER, JSON.stringify(response.user));
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.router.navigate(['/dashboard'], { replaceUrl: true });
    });
  }
}
