import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import {
  SelectYearAndMonthComponent,
} from './select-year-and-month/select-year-and-month.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

type Step = 'personalInfo' | 'loginInfo' | 'uploadDocumentInfo';

@Component({
  selector: 'smarti-form-container',
  standalone: true,
  imports: [
    CommonModule, PersonalInfoComponent, SelectYearAndMonthComponent,
    UploadDocumentComponent,
  ],
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('personalInfo');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public userForm!: FormGroup;

  constructor(private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.userForm = this._fb.group({
      personalInfo: null,
      loginInfo: null,
    });
  }

  subformInitialized(name: string, group: FormGroup) {
    this.userForm.setControl(name, group);
  }

  changeStep(currentStep: string, direction: 'forward' | 'back') {
    switch (currentStep) {
      case 'personalInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('loginInfo');
          this.changingStep.next(true);
        }
        break;
      case 'loginInfoStep':
        if (direction === 'forward') {
          this.currentStepBs.next('uploadDocumentInfo');
          this.changingStep.next(true);
        }
        break;
      case 'uploadDocumentStep':
        if (direction === 'forward') {
          this.currentStepBs.next('personalInfo');
          this.changingStep.next(true);
        }
        break;
    }
  }

  submitForm() {
    const formValues = this.userForm.value;
    // submit the form with a service
  }
}
