import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEmployerOutResponse } from '@shared/api/models';
import { RegisterService, SignInService } from '@shared/api/services';
import {
  REGISTRATION_DATA,
  RegistrationInfoControls,
  registrationInfoFormMapper,
  registrationSetPasswordLink,
} from '@shared/entities';
import { DestroyService, LoginService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputNumberComponent,
} from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { debounceTime, Observable, takeUntil, tap } from 'rxjs';

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
  public isDisabled: boolean = true;
  public personalInfoForm: FormGroup<RegistrationInfoControls> = registrationInfoFormMapper();
  public personalInfoFormChange$: Observable<FormControlStatus> = this.personalInfoForm
    .statusChanges.pipe(takeUntil(this.destroy$));

  constructor(
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
    private readonly signInService: SignInService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.personalInfoForm.updateValueAndValidity({ emitEvent: true });
    this.personalInfoFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }

  public navigateToUploadFile(): void {
    this.registerService.apiEmployersCreateEmployerOutPost({
      email: this.personalInfoForm.controls.email.value as string,
      phone: this.personalInfoForm.controls.phone.value as string,
      company_name: this.personalInfoForm.controls.companyName.value as string,
      identifier: this.personalInfoForm.controls.companyId.value as string,
      user_name: this.personalInfoForm.controls.yourName.value as string,
    }).pipe(
      tap((tokenResponse: CreateEmployerOutResponse) => {
        this.sessionStorageService.setItem(REGISTRATION_DATA, JSON.stringify({
          email: this.personalInfoForm.controls.email.value as string,
          phone: this.personalInfoForm.controls.phone.value as string,
          company_name: this.personalInfoForm.controls.companyName.value as string,
          identifier: this.personalInfoForm.controls.companyId.value as string,
          user_name: this.personalInfoForm.controls.yourName.value as string,
          token: tokenResponse.token,
          departmentId: tokenResponse.departmentId,
        }));
      }),
      debounceTime(500),
      takeUntil(this.destroy$),
    ).subscribe(() => this.router.navigate([registrationSetPasswordLink]));
  }
}
