import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckboxComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-employers-table',
  standalone: true,
  imports: [CommonModule, InputCheckboxComponent, TablePaginationComponent],
  templateUrl: './dashboard-employers-table.component.html',
  styleUrls: ['./dashboard-employers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployersTableComponent {
  public items!: { isSelected: boolean }[] | null;

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
