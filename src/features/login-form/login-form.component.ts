import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputPasswordComponent,
} from '@shared/ui';

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
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public navigateToRestorePassword(): void {
    this.router.navigate(['/reset-password']);
  }

  public dologin(): void {
    this.router.navigate(['/']);
  }
}
