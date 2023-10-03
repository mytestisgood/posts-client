import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MenoraGetResponseItems } from '@shared/api/models';
import { NoElementsToShowComponent } from '@shared/layout';
import {
  ChangePageItemsValue,
  LoaderComponent,
  SelectComponent,
  TablePaginationComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-shield-table',
  standalone: true,
  imports: [
    CommonModule, TablePaginationComponent, SelectComponent, LoaderComponent,
    NoElementsToShowComponent,
  ],
  templateUrl: './dashboard-shield-table.component.html',
  styleUrls: ['./dashboard-shield-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldTableComponent {
  @Input() public items!: MenoraGetResponseItems[] | null;

  public itemsValue: ChangePageItemsValue = { firstValue: 0, lastValue: 6 };

  public changePageItemsValue(value: ChangePageItemsValue): void {
    if (value.lastValue !== undefined) {
      this.itemsValue = { firstValue: value.firstValue, lastValue: value.lastValue };
    }
  }
}
