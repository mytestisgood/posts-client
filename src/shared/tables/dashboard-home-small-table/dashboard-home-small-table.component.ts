import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CompensationsGetResponse, EventCode } from '@shared/api/models';
import { getCalendarDateFromStringDate } from '@shared/helpers';
import { ButtonComponent, LoaderComponent } from '@shared/ui';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-home-small-table',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoaderComponent],
  templateUrl: './dashboard-home-small-table.component.html',
  styleUrls: ['./dashboard-home-small-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeSmallTableComponent {
  @Input() public compensationReport!: CompensationsGetResponse | null;
  @Output() public changeModeEventCode: BehaviorSubject<EventCode> = new BehaviorSubject<EventCode>('9301');

  public mode: 'left' | 'right' = 'right';
  protected readonly getCalendarDateFromStringDate = getCalendarDateFromStringDate;

  public changeTableMode(mode: 'left' | 'right'): void {
    this.mode = mode;
    this.changeModeEventCode.next(this.mode === 'left' ? '9300' : '9301');
  }
}
