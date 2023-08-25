import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-dashboard-employers-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-employers-table.component.html',
  styleUrls: ['./dashboard-employers-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployersTableComponent {

}
