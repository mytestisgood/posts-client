import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InputCheckboxComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-process-table',
  standalone: true,
  imports: [CommonModule, InputCheckboxComponent, TablePaginationComponent],
  templateUrl: './dashboard-process-table.component.html',
  styleUrls: ['./dashboard-process-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessTableComponent {
  public items!: { isSelected: boolean }[] | null;

  constructor(private readonly router: Router) {}

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

  public openDetailInformation(): void {
    const randomId = 'id' + Math.floor(Math.random() * 100);

    this.router.navigate(['/dashboard/processes/' + randomId]);
  }
}
