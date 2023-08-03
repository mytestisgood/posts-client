import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Step,
  Direction,
  RegistrationFormTypeEnum,
  DirectionEnum,
  StepEnum,
} from '../entities/registration.models';
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
  ],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<Step> =
    new BehaviorSubject<Step>(RegistrationFormTypeEnum.PersonalInfo);

  public registrationForm!: FormGroup;
  public readonly currentStepBs: BehaviorSubject<Step> =
    new BehaviorSubject<Step>(RegistrationFormTypeEnum.PersonalInfo);
  public readonly currentStep$: Observable<Step> = this.currentStepBs.asObservable();

  constructor(private readonly fb: FormBuilder) {}

  public ngOnInit(): void {
    this.registrationForm = this.fb.group({
      personalInfo: null,
      uploadDocumentInfo: null,
      verifyEmailInfo: null,
    });
  }

  public subformInitialized(name: Step, group: FormGroup): void {
    this.registrationForm.setControl<Step>(name, group);
  }

  public changeStep(currentStep: string, direction: Direction): void {
    switch (currentStep) {
      case StepEnum.PersonalInfoStep:
        if (direction === DirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.UploadDocumentInfo);
          this.changingStep.next(RegistrationFormTypeEnum.UploadDocumentInfo);
        }
        break;
      case StepEnum.UploadDocumentStep:
        if (direction === DirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.VerifyEmailInfo);
          this.changingStep.next(RegistrationFormTypeEnum.VerifyEmailInfo);
        }
        break;
      case StepEnum.VerifyEmailStep:
        if (direction === DirectionEnum.Forward) {
          this.currentStepBs.next(RegistrationFormTypeEnum.VerifyEmailInfo);
          this.changingStep.next(RegistrationFormTypeEnum.VerifyEmailInfo);
        }
        break;
    }
  }
}
