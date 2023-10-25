import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransferMoneyFormComponent } from '@feature';

@Component({
  selector: 'smarti-transfer-money',
  standalone: true,
  imports: [CommonModule, TransferMoneyFormComponent],
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransferMoneyComponent {

}
