import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { verticalMenuArray, VerticalMenuItem } from '../../../entities/dashboard.models';

@Component({
  selector: 'smarti-dashboard-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMenuComponent {
  public menuItems: VerticalMenuItem[] = verticalMenuArray;

  public changeActiveState(menuItem: VerticalMenuItem): void {
    if (menuItem.isActive) {
      return;
    }
    this.menuItems.map(item => {
      if (item.isActive) {
        item.isActive = false;
      }
    });
    menuItem.isActive = true;
  }
}
