import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { months } from '@shared/entities';
import { DashboardHomeSmallTableComponent, DashboardHomeTableComponent } from '@shared/tables';
import { ButtonComponent, InputYearComponent, SelectComponent } from '@shared/ui';
import {
  BalanceForCompensationComponent,
} from './balance-for-compensation/balance-for-compensation.component';
import { FeedsComponent } from './feeds/feeds.component';
import { InquiriesComponent } from './inquiries/inquiries.component';
import { LastPaymentComponent } from './last-payment/last-payment.component';

@Component({
  selector: 'smarti-dashboard-main',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, SelectComponent, InputYearComponent,
    LastPaymentComponent, DashboardHomeTableComponent, InquiriesComponent, FeedsComponent,
    BalanceForCompensationComponent, DashboardHomeSmallTableComponent,
  ],
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardMainComponent {
  public months: string[] = months;

}
