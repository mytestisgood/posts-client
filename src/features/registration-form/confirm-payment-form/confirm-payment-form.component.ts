import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'smarti-confirm-payment-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-payment-form.component.html',
  styleUrls: ['./confirm-payment-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPaymentFormComponent {

}
