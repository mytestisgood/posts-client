import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlStatus, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '@shared/api/services';
import {
  AllRegistrationSessionData,
  passwordValidatorPattern,
  REGISTRATION_DATA,
  registrationInfoLink,
  registrationUploadFileLink, TOKEN,
} from '@shared/entities';
import { AlertsService, DestroyService } from '@shared/services';
import { ButtonComponent, InputPasswordComponent } from '@shared/ui';
import { catchError, EMPTY, Observable, takeUntil, tap } from 'rxjs';
import { SessionStorageService } from '@shared/web-api';
import { isEmpty } from '@shared/helpers';
import { AsideProcessDialogComponent } from '@shared/dialog';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'smarti-set-up-password-form',
  standalone: true,
    imports: [CommonModule, InputPasswordComponent, ButtonComponent, AsideProcessDialogComponent],
  templateUrl: './set-up-password-form.component.html',
  styleUrls: ['./set-up-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetUpPasswordFormComponent implements OnInit {
  public text_button = 'הרשמה';
  public passwordControl: FormControl<string | null> = new FormControl('', [Validators.required]);
  public isDisabled: boolean = true;
  public email!: string | undefined;
  public regexPassword: RegExp = new RegExp(passwordValidatorPattern);
  public passwordControlChange$: Observable<FormControlStatus> = this.passwordControl.statusChanges.pipe(
    takeUntil(this.destroy$),
  );
  public currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

  constructor(
    @Inject(TuiDialogService) private  readonly dialogs: TuiDialogService,

    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly alertsService: AlertsService,
  ) {
  }

  public ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParams;

    if (!isEmpty(queryParams)) {
      // this.registerService.getUserProcessDataByStep().pipe().subscribe();
      this.email = this.route.snapshot.queryParams['email'];
      this.sessionStorageService.setItem(TOKEN, this.route.snapshot.queryParams['token'] as string);
      this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify({
        email: this.email,
        departmentId: this.route.snapshot.queryParams['departmentId'],
      }));
      this.currentStorageData = JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
    } else {
      this.email = this.currentStorageData.email;
      if (this.currentStorageData.password?.length) {
        this.passwordControl.setValue(this.currentStorageData.password);
        this.passwordControl.updateValueAndValidity({ emitEvent: true });
        this.isDisabled = !this.passwordControl.valid;
        this.text_button = 'עדכון סיסמה';
      }
    }

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
    if (this.passwordControl.value !== this.currentStorageData.password) {
    this.registerService.apiRegisterPost({
      password: this.passwordControl.value as string,
      isFromSignIn: true,
    }).pipe(
      tap(() => {
        this.currentStorageData.password = this.passwordControl.value as string;
        this.currentStorageData.finishPasswordPage = true;
        this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
      }),
      catchError((err) => {
        if (err.error.message === 'User already exists!') {
          this.alertsService.showErrorNotificationIcon('המשתמש שהוזן כבר קיים');
        } else if (err.error.message === 'Password selected') {
          this.alertsService.showErrorNotificationIcon('סיסמה זו נבחרה בעבר');
        } else if (err.error.message === 'No User Found') {
          this.alertsService.showErrorNotificationIcon('המעסיק שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
        } else if (err.error.message === 'Password expired') {
          this.alertsService.showErrorNotificationIcon('תוקף הסיסמה פג');
        }
        else {
          this.alertsService.showErrorNotificationIcon('שגיאה');
        }
        return EMPTY;
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => this.router.navigate([registrationUploadFileLink]));
    } else {
      this.router.navigate([registrationUploadFileLink]);
    }
  }

  public openDialogForAsideProcess(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
      size: 'l',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }
}
