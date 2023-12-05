import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEmployerOutResponse } from '@shared/api/models';
import { RegisterService, SignInService } from '@shared/api/services';
import {
  AllRegistrationSessionData,
  IS_LOGGED_IN,
  REGISTRATION_DATA,
  RegistrationInfoControls,
  registrationInfoFormMapper,
  registrationSetPasswordLink, TOKEN,
} from '@shared/entities';
import { AlertsService, DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputNumberComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { catchError, debounceTime, EMPTY, Observable, of, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-registration-info-form',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ReactiveFormsModule,
    InputCheckboxComponent,
    ButtonComponent,
    InputNumberComponent,
  ],
  templateUrl: './registration-info-form.component.html',
  styleUrls: ['./registration-info-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationInfoFormComponent implements OnInit {
  public title = 'צור חשבון!' ;
  public textButton = 'הירשם';
  public isDisabled: boolean = true;
  public personalInfoForm: FormGroup<RegistrationInfoControls> = registrationInfoFormMapper();
  public personalInfoFormChange$: Observable<FormControlStatus> = this.personalInfoForm
    .statusChanges.pipe(takeUntil(this.destroy$));
  private currentStorageData: AllRegistrationSessionData =
    JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);

  constructor(
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
    private readonly signInService: SignInService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly router: Router,
    private readonly alertsService: AlertsService,
  ) {
  }

  public ngOnInit(): void {
    if (this.currentStorageData) {
      this.title = 'עדכון חשבון!';
      this.textButton = 'עדכן';
    }

    this.personalInfoForm.setValue({
      email: this.currentStorageData?.email ?? '',
      phone: this.currentStorageData?.phone ?? '',
      identifier: this.currentStorageData?.identifier ?? '',
      yourName: this.currentStorageData?.yourName ?? '',
      companyName: this.currentStorageData?.companyName ?? '',
      acceptPrivacy: this.currentStorageData?.acceptPrivacy ?? false,
    });
    this.isDisabled = !this.personalInfoForm.valid;
    this.personalInfoForm.updateValueAndValidity({ emitEvent: true });
    this.personalInfoFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }
  public navigateToUploadFile(): void {
    if (!this.currentStorageData) {
      this.registerService.apiEmployersCreateEmployerOutPost({
        email: this.personalInfoForm.controls.email.value as string,
        phone: this.personalInfoForm.controls.phone.value as string,
        company_name: this.personalInfoForm.controls.companyName.value as string,
        identifier: this.personalInfoForm.controls.identifier.value as string,
        user_name: this.personalInfoForm.controls.yourName.value as string,
      }).pipe(
        tap((tokenResponse: CreateEmployerOutResponse) => {
          this.setItemSessionStorage(tokenResponse);
          this.sessionStorageService.setItem(TOKEN, tokenResponse.token as string);
          this.sessionStorageService.setItem(IS_LOGGED_IN, 'false');
        }),
        catchError((err) => {
          if (err.error.message === 'user exists') {
            this.alertsService.showErrorNotificationIcon('המשתמש שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
          }
          else if (err.error.message === 'identifier exists') {
            this.alertsService.showErrorNotificationIcon('המעסיק שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
          }
          else {
            this.alertsService.showErrorNotificationIcon('שגיאה');
          }
          return EMPTY;
        }),
        debounceTime(500),
        takeUntil(this.destroy$),
      ).subscribe(() => this.router.navigate([registrationSetPasswordLink]));

    } else { //update employer
      this.registerService.apiEmployersUpdateEmployerOut({
        email: this.personalInfoForm.controls.email.value as string,
        phone: this.personalInfoForm.controls.phone.value as string,
        company_name: this.personalInfoForm.controls.companyName.value as string,
        identifier: this.personalInfoForm.controls.identifier.value as string,
        user_name: this.personalInfoForm.controls.yourName.value as string,
        employer_id: this.currentStorageData.employerId,
        user_id: this.currentStorageData.userId,
      }).pipe(
        tap(() => {
          this.setItemSessionStorage(null);
        }),
        catchError((err) => {
          if (err.error.message === 'user exists') {
            this.alertsService.showErrorNotificationIcon('המשתמש שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
          } else if (err.error.message === 'employer doesnt exists') {
            this.alertsService.showErrorNotificationIcon('מעסיק לא נמצא');
          } else if (err.error.message === 'identifier exists') {
            this.alertsService.showErrorNotificationIcon('המעסיק שהוזן כבר קיים- ניתן להתחבר דרך דף התחברות');
          }
          else {
            this.alertsService.showErrorNotificationIcon('שגיאה');
          }
          return EMPTY;
        }),
        debounceTime(500),
        takeUntil(this.destroy$),
      ).subscribe(() => this.router.navigate([registrationSetPasswordLink]));
    }
  }

  private setItemSessionStorage(tokenResponse: CreateEmployerOutResponse | null): void {
    if (tokenResponse === null) {
      this.currentStorageData = JSON.parse(this.sessionStorageService.getItem(REGISTRATION_DATA) as string);
      this.currentStorageData.email = this.personalInfoForm.controls.email.value as string;
      this.currentStorageData.phone = this.personalInfoForm.controls.phone.value  as string;
      this.currentStorageData.companyName = this.personalInfoForm.controls.companyName.value as string;
      this.currentStorageData.identifier = this.personalInfoForm.controls.identifier.value as string;
      this.currentStorageData.yourName = this.personalInfoForm.controls.yourName.value as string;
      this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify(this.currentStorageData));
    } else {
      this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify({
        email: this.personalInfoForm.controls.email.value as string,
        phone: this.personalInfoForm.controls.phone.value as string,
        companyName: this.personalInfoForm.controls.companyName.value as string,
        identifier: this.personalInfoForm.controls.identifier.value as string,
        yourName: this.personalInfoForm.controls.yourName.value as string,
        departmentId: tokenResponse?.departmentId,
        employerId: tokenResponse?.employerId,
        userId: tokenResponse?.userId,
        acceptPrivacy: this.personalInfoForm.controls.acceptPrivacy.value as boolean,
        finishInfoPage: true,
      }));
    }
  }
}
