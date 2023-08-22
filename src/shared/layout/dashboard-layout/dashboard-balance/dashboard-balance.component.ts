import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardBalanceTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent, InputDateComponent,
  InputSearchComponent,
  SelectComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-balance',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    SelectComponent, InputDateComponent, DashboardBalanceTableComponent,
  ],
  templateUrl: './dashboard-balance.component.html',
  styleUrls: ['./dashboard-balance.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardBalanceComponent {
  public isCustomDropdownActive: boolean = false;

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
