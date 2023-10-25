import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaymentInstructionFormComponent } from '@feature';

@Component({
  selector: 'smarti-payment-instruction',
  standalone: true,
  imports: [CommonModule, PaymentInstructionFormComponent],
  templateUrl: './payment-instruction.component.html',
  styleUrls: ['./payment-instruction.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInstructionComponent {

}
