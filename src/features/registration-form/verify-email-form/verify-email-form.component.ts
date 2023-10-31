import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '@shared/api/services';
import { ChangeEmailDialogComponent, SuccessDialogComponent } from '@shared/dialog';
import {
  loginAfterRegistrationLink,
  VerificationEmailControls,
  verifyEmailFormMapper,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputNumberComponent } from '@shared/ui';
import { TuiDialogService } from '@taiga-ui/core';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-verify-email-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputNumberComponent,
    SuccessDialogComponent,
    ReactiveFormsModule,
    ChangeEmailDialogComponent,
  ],
  templateUrl: './verify-email-form.component.html',
  styleUrls: ['./verify-email-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailFormComponent implements OnInit {
  @Input() public currentEmail!: string;
  @Input() public token!: string;
  @Input() public departmentId!: number;
  public verifyEmailInfo: FormGroup<VerificationEmailControls> = verifyEmailFormMapper();
  public isDisabled: boolean = true;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.verifyEmailInfo.statusChanges.pipe(
      tap((isValid: FormControlStatus) => this.isDisabled = !(isValid === 'VALID')),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public sendVerifyCode(): void {
    this.signInService.apiUsersSendVerifyCodeGet().pipe(takeUntil(this.destroy$)).subscribe();
  }

  public navigateToLoginPage(): void {
    this.signInService.apiUsersCheckVerifyCodePost({
      code: this.verifyEmailInfo.controls.emailVerifyCode.value as string,
      departmentId: this.departmentId,
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => this.router.navigate([loginAfterRegistrationLink]));
  }
}
