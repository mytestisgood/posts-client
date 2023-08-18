import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { months } from '@shared/entities';
import { DashboardProcessTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  InputYearComponent,
  SelectComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-processes',
  standalone: true,
  imports: [
    CommonModule, InputYearComponent, SelectComponent, ButtonComponent,
    InputSearchComponent, DashboardProcessTableComponent, CustomDropdownComponent,
  ],
  templateUrl: './dashboard-processes.component.html',
  styleUrls: ['./dashboard-processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessesComponent {
  protected readonly months: string[] = months;
}
