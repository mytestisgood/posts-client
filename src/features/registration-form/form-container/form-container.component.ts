import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  RegistrationDirection,
  RegistrationDirectionEnum,
  RegistrationFormTypeEnum,
  RegistrationStep,
  RegistrationStepEnum,
} from '@shared/entities';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@Component({
  selector: 'smarti-form-container',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    UploadDocumentComponent,
    VerifyEmailComponent,
    PaymentMethodComponent,
  ],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<RegistrationStep> =
    new BehaviorSubject<RegistrationStep>(RegistrationFormTypeEnum.PersonalInfo);

  public registrationForm!: FormGroup;
  public readonly currentStepBs: BehaviorSubject<RegistrationStep> =
    new BehaviorSubject<RegistrationStep>(RegistrationFormTypeEnum.PersonalInfo);
  public readonly currentStep$: Observable<RegistrationStep> = this.currentStepBs.asObservable();
  public registrationStepEnum = RegistrationStepEnum;
  public registrationFormTypeEnum = RegistrationFormTypeEnum;

  constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.registrationForm = this.fb.group({
      personalInfo: null,
      uploadDocumentInfo: null,
      paymentMethodInfo: null,
      verifyEmailInfo: null,
    });
  }

  public subformInitialized(name: RegistrationStep, group: FormGroup): void {
    this.registrationForm.setControl<RegistrationStep>(name, group);
  }

  public changeStep(currentStep: string, direction: RegistrationDirection): void {
    switch (currentStep) {
      case RegistrationStepEnum.PersonalInfoStep:
        if (direction === RegistrationDirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.UploadDocumentInfo);
          this.changingStep.next(RegistrationFormTypeEnum.UploadDocumentInfo);
        }
        break;
      case RegistrationStepEnum.UploadDocumentStep:
        if (direction === RegistrationDirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.PaymentMethodInfo);
          this.changingStep.next(RegistrationFormTypeEnum.PaymentMethodInfo);
        }
        break;
      case RegistrationStepEnum.PaymentMethodStep:
        if (direction === RegistrationDirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.VerifyEmailInfo);
          this.changingStep.next(RegistrationFormTypeEnum.VerifyEmailInfo);
        }
        if (direction === RegistrationDirectionEnum.Back) {
          this.currentStepBs.next(RegistrationFormTypeEnum.UploadDocumentInfo);
          this.changingStep.next(RegistrationFormTypeEnum.UploadDocumentInfo);
        }
        break;
      case RegistrationStepEnum.VerifyEmailStep:
        if (direction === RegistrationDirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.VerifyEmailInfo);
          this.changingStep.next(RegistrationFormTypeEnum.VerifyEmailInfo);
        }
        break;
    }
  }
}
