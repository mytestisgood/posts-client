import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardShieldTableComponent } from '@shared/tables';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-shield',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DashboardShieldTableComponent],
  templateUrl: './dashboard-shield.component.html',
  styleUrls: ['./dashboard-shield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldComponent {

}
