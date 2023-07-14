import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { InputFieldComponent } from '../../shared/ui/input-field/input-field.component';
import { FormContainerComponent } from './form-container/form-container.component';

@Component({
  selector: 'smarti-registration-form',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, FormContainerComponent],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent {
  @Output() changingImage: BehaviorSubject<string> = new BehaviorSubject<string>('personalInfo');
}
