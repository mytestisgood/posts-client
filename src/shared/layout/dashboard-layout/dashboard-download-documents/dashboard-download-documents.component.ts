import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-dashboard-download-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-download-documents.component.html',
  styleUrls: ['./dashboard-download-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDownloadDocumentsComponent {

}
