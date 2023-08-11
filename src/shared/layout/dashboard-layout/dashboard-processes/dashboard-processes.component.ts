import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'smarti-dashboard-processes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-processes.component.html',
  styleUrls: ['./dashboard-processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessesComponent {

}
