import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegistrationInfoFormComponent } from '@feature';

@Component({
  selector: 'smarti-registration-info',
  standalone: true,
  imports: [CommonModule, RegistrationInfoComponent, RegistrationInfoFormComponent],
  templateUrl: './registration-info.component.html',
  styleUrls: ['./registration-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationInfoComponent {

}
