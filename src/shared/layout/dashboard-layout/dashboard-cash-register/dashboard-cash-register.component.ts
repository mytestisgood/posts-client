import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardCashRegisterTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  SelectComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-dashboard-cash-register',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    SelectComponent, DashboardCashRegisterTableComponent,
  ],
  templateUrl: './dashboard-cash-register.component.html',
  styleUrls: ['./dashboard-cash-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterComponent {
  public isCustomDropdownActive: boolean = false;

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
