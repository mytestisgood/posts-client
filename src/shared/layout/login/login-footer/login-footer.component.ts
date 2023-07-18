import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-login-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-footer.component.html',
  styleUrls: ['./login-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFooterComponent {

}
