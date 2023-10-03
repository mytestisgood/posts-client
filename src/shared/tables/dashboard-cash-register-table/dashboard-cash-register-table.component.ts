import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AllProductsGetResponseItems } from '@shared/api/models';
import { NoElementsToShowComponent } from '@shared/layout';
import { ChangePageItemsValue, LoaderComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-cash-register-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, LoaderComponent, NoElementsToShowComponent],
  templateUrl: './dashboard-cash-register-table.component.html',
  styleUrls: ['./dashboard-cash-register-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterTableComponent {
  @Input() public allProducts!: AllProductsGetResponseItems[] | null;

  public paginationValue: ChangePageItemsValue = { firstValue: 0, lastValue: 7 };

  public onChangeSliceOfPage(value: ChangePageItemsValue): void {
    if (value.lastValue !== undefined) {
      this.paginationValue = { firstValue: value.firstValue, lastValue: value.lastValue };
    }
  }
}
