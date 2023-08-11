import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { months } from '@shared/entities';
import { InputYearComponent, SelectComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-home-table',
  standalone: true,
  imports: [CommonModule, InputYearComponent, SelectComponent],
  templateUrl: './dashboard-home-table.component.html',
  styleUrls: ['./dashboard-home-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeTableComponent {

  protected readonly months = months;
}
