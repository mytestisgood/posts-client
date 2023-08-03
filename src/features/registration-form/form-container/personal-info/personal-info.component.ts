import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputFieldComponent,
  InputNumberComponent,
} from '@shared/ui';
import { Observable, takeUntil } from 'rxjs';
import { InlineResponse2001, SignInService } from '@shared/api';
import { LocalStorageService } from '@shared/web-api';
import { personalInfoFormMapper } from '../../entities/registration-mapper';
import {
  Direction,
  PersonalInfoControls,
  REGISTRATION_TOKEN, RegistrationFormValueType,
} from '../../entities/registration.models';

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
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public isDisabled: boolean = true;
  public personalInfoForm: FormGroup<PersonalInfoControls> = personalInfoFormMapper();
  public personalInfoFormChange$: Observable<FormControlStatus> = this.personalInfoForm
    .statusChanges.pipe(takeUntil(this.destroy$));

  constructor(
    private readonly destroy$: DestroyService,
    private readonly signInService: SignInService,
    private readonly localStorageService:LocalStorageService,
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

  public doChangeStep(direction: Direction): void {
    this.signInService.apiEmployersCreateEmployerOutPost({
      email: this.personalInfoForm.controls.email.value as string,
      phone: this.personalInfoForm.controls.phone.value as string,
      company_name: this.personalInfoForm.controls.companyName.value as string,
      identifier: this.personalInfoForm.controls.companyId.value as string,
      user_name: this.personalInfoForm.controls.yourName.value as string,
    }).pipe(takeUntil(this.destroy$)).subscribe((response: InlineResponse2001) => {
      this.localStorageService.setItem(REGISTRATION_TOKEN, response.token as string);
      // this.localStorageService.setItem(DEPARTMENT_ID, response?.departmentId as string);
      this.subformInitialized.emit(this.personalInfoForm);
      this.changeStep.emit(direction);
    });
  }
}
