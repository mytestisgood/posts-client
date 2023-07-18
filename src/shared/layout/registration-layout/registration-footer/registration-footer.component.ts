import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'smarti-registration-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-footer.component.html',
  styleUrls: ['./registration-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFooterComponent {

}
