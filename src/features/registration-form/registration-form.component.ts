import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { FormContainerComponent } from './form-container/form-container.component';

@Component({
  selector: 'smarti-registration-form',
  standalone: true,
  imports: [CommonModule, FormContainerComponent],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  @Output() public changingStep: BehaviorSubject<string> = new BehaviorSubject<string>('personalInfo');
}
