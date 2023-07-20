import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetNewPasswordComponent } from './set-new-password/set-new-password.component';
import { VerifyStepComponent } from './verify-step/verify-step.component';

type Step = 'verifyStep' | 'setPasswordStep';

@Component({
  selector: 'smarti-form-container-reset-password',
  standalone: true,
  imports: [CommonModule, VerifyStepComponent, SetNewPasswordComponent],
  templateUrl: './form-container-reset-password.component.html',
  styleUrls: ['./form-container-reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerResetPasswordComponent implements OnInit {
  @Output() public changingStep: BehaviorSubject<Step> = new BehaviorSubject<Step>('verifyStep');

  private currentStepBs: BehaviorSubject<Step> = new BehaviorSubject<Step>('verifyStep');
  public currentStep$: Observable<Step> = this.currentStepBs.asObservable();
  public userForm!: FormGroup;
  constructor(private _fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.userForm = this._fb.group({
      verifyStep: null,
      setPasswordStep: null,
    });
  }

  public changeStep(currentStep: string, direction: 'forward' | 'back'): void {
    switch (currentStep) {
      case 'verifyStep':
        if (direction === 'forward') {
          this.currentStepBs.next('setPasswordStep');
          this.changingStep.next('setPasswordStep');
        }
        break;
    }
  }

  public subformInitialized(name: string, group: FormGroup): void {
    this.userForm.setControl(name, group);
  }
}
