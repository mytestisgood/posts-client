import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20050Items } from '@shared/api';
import { LoaderComponent, SelectComponent, TablePaginationComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-shield-table',
  standalone: true,
  imports: [CommonModule, TablePaginationComponent, SelectComponent, LoaderComponent],
  templateUrl: './dashboard-shield-table.component.html',
  styleUrls: ['./dashboard-shield-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldTableComponent {
  @Input() public items!: InlineResponse20050Items[] | null;
}
