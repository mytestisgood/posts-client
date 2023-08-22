import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputCheckboxComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-documents-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, InputCheckboxComponent],
  templateUrl: './dashboard-documents-table.component.html',
  styleUrls: ['./dashboard-documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsTableComponent {
  public items!: { isSelected: boolean }[] | null;
}
