import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse2006 } from '@shared/api';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-home-small-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dashboard-home-small-table.component.html',
  styleUrls: ['./dashboard-home-small-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeSmallTableComponent {
  @Input() public compensationReport!: InlineResponse2006 | null;
}
