import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-shield-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, SelectComponent],
  templateUrl: './dashboard-shield-table.component.html',
  styleUrls: ['./dashboard-shield-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldTableComponent {

}
