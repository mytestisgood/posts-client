import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {
  SelectYearAndMonthComponent,
} from './select-year-and-month/select-year-and-month.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

type Step = 'personalInfo' | 'loginInfo' | 'uploadDocumentInfo' | 'verifyEmailInfo';

@Component({
  selector: 'smarti-form-container',
  standalone: true,
  imports: [
    CommonModule,
    PersonalInfoComponent,
    SelectYearAndMonthComponent,
    UploadDocumentComponent,
    VerifyEmailComponent,
  ],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<Step> = new BehaviorSubject<Step>('personalInfo');

  public userForm!: FormGroup;
  public readonly currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('personalInfo');
  public readonly currentStep$: Observable<Step> = this.currentStepBs.asObservable();

  constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      personalInfo: null,
      loginInfo: null,
    });
  }

  public subformInitialized(name: string, group: FormGroup): void {
    this.userForm.setControl(name, group);
  }

  public changeStep(currentStep: string, direction: 'forward' | 'back'): void {
    switch (currentStep) {
      case 'personalInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('loginInfo');
          this.changingStep.next('loginInfo');
        }
        break;
      case 'loginInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('uploadDocumentInfo');
          this.changingStep.next('uploadDocumentInfo');
        }
        break;
      case 'uploadDocumentStep':
        if (direction === 'forward') {
          this.currentStepBs.next('verifyEmailInfo');
          this.changingStep.next('verifyEmailInfo');
        }
        break;
      case 'verifyEmailStep':
        if (direction === 'forward') {
          this.currentStepBs.next('verifyEmailInfo');
          this.changingStep.next('verifyEmailInfo');
        }
        break;
    }
  }
}
