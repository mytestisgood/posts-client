import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { verticalMenuArray, VerticalMenuItem } from '@shared/entities';

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
  public dashboard: string = '/dashboard/';

  constructor(private readonly router: Router) {
    const currentChildRoute: string = this.router.url.split(this.dashboard).pop() as string;

    this.getActiveState(currentChildRoute);
  }

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
    this.router.navigate([this.dashboard + menuItem.item]);
  }

  private getActiveState(currentUrl: string): void {
    const parentUrl = currentUrl.split('/')[0];

    this.menuItems.map(item => {
      if (item.isActive) {
        item.isActive = false;
      }
      if (item.item === currentUrl || item.item === parentUrl) {
        item.isActive = true;
      }
    });
  }
}
