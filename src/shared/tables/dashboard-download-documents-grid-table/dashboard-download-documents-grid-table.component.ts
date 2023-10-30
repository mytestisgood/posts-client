import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardDownloadDocumentsModel } from '@shared/entities';
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
  @Input() public items!: DashboardDownloadDocumentsModel[];
  @Output() public downloadFileClicked: EventEmitter<DashboardDownloadDocumentsModel> = new EventEmitter();
  public isAllSelected: boolean = false;

  public checkRow(isSelected: boolean, index: number): void {
    this.items[index].isSelected.setValue(isSelected);
  }

  public selectAll(): void {
    this.isAllSelected = true;
    this.items?.forEach((item: DashboardDownloadDocumentsModel) => (item.isSelected.setValue(this.isAllSelected)));
  }

  public onDownloadFile(file: DashboardDownloadDocumentsModel): void {
    this.downloadFileClicked.next(file);
  }
}
