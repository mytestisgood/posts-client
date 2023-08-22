import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-cash-register-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent],
  templateUrl: './dashboard-cash-register-table.component.html',
  styleUrls: ['./dashboard-cash-register-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterTableComponent {

}
