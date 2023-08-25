import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDownloadDocumentsGridTableComponent } from '@shared/tables';
import { ButtonComponent, InputSearchComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-download-documents',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, InputSearchComponent,
    DashboardDownloadDocumentsGridTableComponent,
  ],
  templateUrl: './dashboard-download-documents.component.html',
  styleUrls: ['./dashboard-download-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDownloadDocumentsComponent {

}
