import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardEmployersTableComponent } from '@shared/tables';
import { ButtonComponent, CustomDropdownComponent, InputSearchComponent } from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-employer',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    DashboardEmployersTableComponent,
  ],
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardEmployerComponent {
  public isCustomDropdownActive: boolean = false;

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
