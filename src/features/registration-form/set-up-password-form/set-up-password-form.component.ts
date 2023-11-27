import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormControlStatus, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '@shared/api/services';
import {
  AllRegistrationSessionData,
  passwordValidatorPattern,
  REGISTRATION_DATA,
  registrationInfoLink,
  registrationUploadFileLink, TOKEN,
} from '@shared/entities';
import {DestroyService} from '@shared/services';
import {ButtonComponent, InputPasswordComponent} from '@shared/ui';
import {SessionStorageService} from '@shared/web-api';
import {Observable, takeUntil, tap} from 'rxjs';
import {isEmpty} from "@shared/helpers";
import {AsideProcessDialogComponent} from "@shared/dialog";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService} from "@taiga-ui/core";

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
  ) {
  }

  public ngOnInit(): void {
    console.log(1)
    const queryParams = this.route.snapshot.queryParams;

    if (!isEmpty(queryParams)) {
      console.log(77777777)
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
        this.passwordControl.updateValueAndValidity({emitEvent: true});
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
