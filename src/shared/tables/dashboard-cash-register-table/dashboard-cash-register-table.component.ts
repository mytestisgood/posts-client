import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AllProductsGetResponseItems } from '@shared/api/models';
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
  @Input() public allProducts!: AllProductsGetResponseItems[] | null;
}
