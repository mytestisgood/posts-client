import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CompensationReportGetResponse } from '@shared/api/models';
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
  @Input() public compensationReport!: CompensationReportGetResponse | null;
  public mode: 'left' | 'right' = 'right';

  public changeTableMode(mode: 'left' | 'right'): void {
    this.mode = mode;
  }
}
