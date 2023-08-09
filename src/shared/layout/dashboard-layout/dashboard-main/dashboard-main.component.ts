import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-main',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainComponent {

}
