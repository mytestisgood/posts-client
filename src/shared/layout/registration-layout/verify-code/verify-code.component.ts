import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'smarti-verify-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyCodeComponent {

}
