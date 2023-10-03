import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CompensationsListItems } from '@shared/entities';
import { NoElementsToShowComponent } from '@shared/layout';
import {
  ChangePageItemsValue,
  InputCheckboxComponent,
  LoaderComponent,
  TablePaginationComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-compensations-table',
  standalone: true,
  imports: [
    CommonModule, TablePaginationComponent, InputCheckboxComponent, LoaderComponent,
    NoElementsToShowComponent,
  ],
  templateUrl: './dashboard-compensations-table.component.html',
  styleUrls: ['./dashboard-compensations-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCompensationsTableComponent {
  @Input() public items!: CompensationsListItems[] | null;

  public itemsValue: ChangePageItemsValue = { firstValue: 0, lastValue: 7 };

  public get isSelectedAll(): boolean {
    return this.items?.every(item => item.isSelected) ?? false;
  }

  public checkRow(isSelected: boolean, index: number): void {
    if (!this.items) {
      return;
    }

    this.items[index].isSelected = isSelected;
  }

  public checkAll(isSelected: boolean): void {
    this.items?.forEach(item => (item.isSelected = isSelected));
  }

  public onChangeSliceOfPage(value: ChangePageItemsValue): void {
    if (value.lastValue !== undefined) {
      this.itemsValue = { firstValue: value.firstValue, lastValue: value.lastValue };
    }
  }
}
