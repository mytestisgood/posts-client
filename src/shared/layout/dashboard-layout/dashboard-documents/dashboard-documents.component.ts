import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-dashboard-documents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsComponent {

}
