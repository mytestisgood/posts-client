import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import {
  FormContainerResetPasswordComponent,
} from './form-container-reset-password/form-container-reset-password.component';

@Component({
  selector: 'smarti-reset-password-form',
  standalone: true,
  imports: [CommonModule, FormContainerResetPasswordComponent],
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent {
  @Output() public changingStep: BehaviorSubject<string> = new BehaviorSubject<string>('verifyStep');
}
