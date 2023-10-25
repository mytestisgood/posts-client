import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SetUpPasswordFormComponent } from '@feature';

@Component({
  selector: 'smarti-set-password',
  standalone: true,
  imports: [CommonModule, SetUpPasswordFormComponent],
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordComponent {

}
