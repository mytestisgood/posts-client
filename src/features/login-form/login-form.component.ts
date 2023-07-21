import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputPasswordComponent,
} from '@shared/ui';
import { takeUntil, tap } from 'rxjs';

interface LoginForm {
  email: FormControl<string | null>
  password: FormControl<string | null>
  isRemember: FormControl<boolean | null>
}

@Component({
  selector: 'smarti-login-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, InputFieldComponent,
    InputPasswordComponent, InputCheckboxComponent, ButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public loginForm: FormGroup<LoginForm> = new FormGroup<LoginForm>({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isRemember: new FormControl(false),
  });
  public isDisabled: boolean = true;
  public loginFormChange$ = this.loginForm.statusChanges.pipe(
    tap(isValid => this.isDisabled = !(isValid === 'VALID')),
    takeUntil(this.destroy$),
  )

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    ) {
  }

  public ngOnInit(): void {
    this.loginFormChange$.subscribe();
  }

  public navigateToRestorePassword(): void {
    this.router.navigate(['/reset-password']);
  }

  public doLogin(): void {
    this.router.navigate(['/']);
  }

  public changeButtonStatus(isFilled: boolean): void {
    this.isDisabled = !isFilled;
  }
}
