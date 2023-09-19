import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20029Items } from '@shared/api';
import { LoaderComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-cash-register-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, LoaderComponent],
  templateUrl: './dashboard-cash-register-table.component.html',
  styleUrls: ['./dashboard-cash-register-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterTableComponent {
  @Input() public allProducts!: InlineResponse20029Items[] | null;
}
