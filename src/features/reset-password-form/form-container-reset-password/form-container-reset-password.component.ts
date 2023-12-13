import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { VerifyStepComponent } from './verify-step/verify-step.component';
import {ChooseVerifyTypeComponent} from "./choose-verify-type/choose-verify-type.component";

type Step = 'verifyStep' | 'setPasswordStep'|'chooseVerifyType';

@Component({
  selector: 'smarti-form-container-reset-password',
  standalone: true,
  imports: [CommonModule, VerifyStepComponent, SetNewPasswordComponent, ChooseVerifyTypeComponent],
  templateUrl: './form-container-reset-password.component.html',
  styleUrls: ['./form-container-reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormContainerResetPasswordComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<Step> = new BehaviorSubject<Step>('chooseVerifyType');

  public readonly currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('chooseVerifyType');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public userForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      verifyStep: null,

      setPasswordStep: null,
    });
  }

  public changeStep(currentStep: string, direction: 'forward' | 'back'): void {
    switch (currentStep) {
      case 'chooseVerifyType':
        if (direction === 'forward') {
          this.currentStepBs.next('verifyStep');
          this.changingStep.next('verifyStep');
        }
        break;
      case 'verifyStep':
        if (direction === 'forward') {
          this.currentStepBs.next('setPasswordStep');
          this.changingStep.next('setPasswordStep');
        }
    }
  }

  public subformInitialized(name: string, group: FormGroup): void {
    this.userForm.setControl(name, group);
  }
}
