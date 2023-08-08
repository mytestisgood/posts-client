import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@shared/ui';
import {
  DashboardNotificationItemComponent,
} from './dashboard-notification-item/dashboard-notification-item.component';

@Component({
  selector: 'smarti-dashboard-notification',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DashboardNotificationItemComponent],
  templateUrl: './dashboard-notification.component.html',
  styleUrls: ['./dashboard-notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNotificationComponent {
}
