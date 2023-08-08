import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { downloadFileHelper } from '@shared/helpers';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-notification-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './dashboard-notification-item.component.html',
  styleUrls: ['./dashboard-notification-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardNotificationItemComponent {
  @Input() public hasFile: boolean = false;
  @Input() public isNotificationRead: boolean = false;
  public downloadFile(): void {
    downloadFileHelper('', '');
  }
}
