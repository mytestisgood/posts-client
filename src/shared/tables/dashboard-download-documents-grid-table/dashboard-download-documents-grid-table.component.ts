import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputCheckboxComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-download-documents-grid-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, InputCheckboxComponent],
  templateUrl: './dashboard-download-documents-grid-table.component.html',
  styleUrls: ['./dashboard-download-documents-grid-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDownloadDocumentsGridTableComponent {
  public items!: { isSelected: boolean }[] | null;
  public isAllSelected: boolean = false;

  public checkRow(isSelected: boolean, index: number): void {
    if (!this.items) {
      return;
    }

    this.items[index].isSelected = isSelected;
  }

  public checkAll(): void {
    this.isAllSelected = !this.isAllSelected;
    this.items?.forEach(item => (item.isSelected = this.isAllSelected));
  }
}
