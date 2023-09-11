import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20031Items } from '@shared/api';
import { DashboardDocumentsDownloadFile } from '@shared/entities';
import { InputCheckboxComponent, LoaderComponent, TablePaginationComponent } from '@shared/ui';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-documents-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, InputCheckboxComponent, LoaderComponent],
  templateUrl: './dashboard-documents-table.component.html',
  styleUrls: ['./dashboard-documents-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsTableComponent {
  @Input() public documents!: InlineResponse20031Items[] | null;
  @Output() public downloadFileEvent: Subject<DashboardDocumentsDownloadFile> =
    new Subject<DashboardDocumentsDownloadFile>();

  public onDownloadFile(id: string | undefined, employerId: string | undefined): void {
    this.downloadFileEvent.next({ id: id as string, employerId: employerId as string });
  }
}
