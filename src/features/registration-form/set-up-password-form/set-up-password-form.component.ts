import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormControlStatus, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '@shared/api/services';
import {
  passwordValidatorPattern,
  registrationInfoLink,
  registrationUploadFileLink,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputPasswordComponent } from '@shared/ui';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-set-up-password-form',
  standalone: true,
  imports: [CommonModule, InputPasswordComponent, ButtonComponent],
  templateUrl: './set-up-password-form.component.html',
  styleUrls: ['./set-up-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetUpPasswordFormComponent implements OnInit {
  public passwordControl: FormControl<string | null> = new FormControl('', [Validators.required]);
  public isDisabled: boolean = true;
  public regexPassword: RegExp = new RegExp(passwordValidatorPattern);
  public passwordControlChange$: Observable<FormControlStatus> = this.passwordControl.statusChanges.pipe(
    takeUntil(this.destroy$),
  );

  constructor(
    private readonly router: Router,
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
  ) {
  }

  public ngOnInit(): void {
    this.passwordControlChange$.subscribe(status => {
      if (this.regexPassword.test(this.passwordControl.value as string)) {
        this.isDisabled = !(status === 'VALID');
      } else {
        this.isDisabled = true;
      }
    });
  }

  public navigateToRegistrationInfo(): void {
    this.router.navigate([registrationInfoLink]);
  }

  public setPassword(): void {
    this.registerService.apiRegisterPost({
      password: this.passwordControl.value as string,
      isFromSignIn: true,
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => this.router.navigate([registrationUploadFileLink]));

  }
}
