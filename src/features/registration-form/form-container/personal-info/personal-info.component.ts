import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControlStatus, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InlineResponse2001, RegisterService, SignInService } from '@shared/api';
import {
  DEPARTMENT_ID,
  PersonalInfoControls,
  personalInfoFormMapper,
  RegistrationDirection,
  RegistrationFormValueType,
  TOKEN,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputNumberComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { Observable, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-personal-info',
  standalone: true,
  imports: [
    CommonModule,
    InputFieldComponent,
    ReactiveFormsModule,
    InputCheckboxComponent,
    ButtonComponent,
    InputNumberComponent,
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Input() public currentFormStateValue!: RegistrationFormValueType;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();

  public isDisabled: boolean = true;
  public personalInfoForm: FormGroup<PersonalInfoControls> = personalInfoFormMapper();
  public personalInfoFormChange$: Observable<FormControlStatus> = this.personalInfoForm
    .statusChanges.pipe(takeUntil(this.destroy$));

  constructor(
    private readonly destroy$: DestroyService,
    private readonly registerService: RegisterService,
    private readonly signInService: SignInService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public ngOnInit(): void {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    }
    this.subformInitialized.emit(this.personalInfoForm);
    this.personalInfoForm.updateValueAndValidity({ emitEvent: true });
    this.personalInfoFormChange$.subscribe((isValid: FormControlStatus) =>
      this.isDisabled = !(isValid === 'VALID'),
    );
  }

  public doChangeStep(direction: RegistrationDirection): void {
    this.registerService.apiEmployersCreateEmployerOutPost({
      email: this.personalInfoForm.controls.email.value as string,
      phone: this.personalInfoForm.controls.phone.value as string,
      company_name: this.personalInfoForm.controls.companyName.value as string,
      identifier: this.personalInfoForm.controls.companyId.value as string,
      user_name: this.personalInfoForm.controls.yourName.value as string,
    }).pipe(
      switchMap((tokenResponse: InlineResponse2001) => {
        this.localStorageService.setItem(TOKEN, tokenResponse?.token as string);
        this.localStorageService.setItem(DEPARTMENT_ID, tokenResponse?.departmentId as string);
        this.subformInitialized.emit(this.personalInfoForm);

        return this.signInService.apiUsersSendVerifyCodePost(tokenResponse?.token)
          .pipe(takeUntil(this.destroy$));
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => this.changeStep.emit(direction));
  }
}
