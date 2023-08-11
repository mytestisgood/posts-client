import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-last-payment',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './last-payment.component.html',
  styleUrls: ['./last-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastPaymentComponent {

}
