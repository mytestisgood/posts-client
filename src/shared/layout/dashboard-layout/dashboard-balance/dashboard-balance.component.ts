import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-dashboard-balance',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-balance.component.html',
  styleUrls: ['./dashboard-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBalanceComponent {

}
