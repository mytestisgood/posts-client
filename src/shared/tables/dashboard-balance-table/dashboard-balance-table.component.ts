import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckboxComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-balance-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, InputCheckboxComponent],
  templateUrl: './dashboard-balance-table.component.html',
  styleUrls: ['./dashboard-balance-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBalanceTableComponent {
  public items!: { isSelected: boolean }[] | null;
  public isHaveData: boolean = true;
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
}
