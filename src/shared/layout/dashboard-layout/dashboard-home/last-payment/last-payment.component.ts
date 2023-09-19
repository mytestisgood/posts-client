import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse2004ReportsDataProcesses } from '@shared/api';
import { getMonthAndYearFromStringDate, getYearFromStringDate } from '@shared/helpers';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-last-payment',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './last-payment.component.html',
  styleUrls: ['./last-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastPaymentComponent {
  @Input() public lastPayment: Array<InlineResponse2004ReportsDataProcesses> | undefined;

  public mainText: string = 'ספטמבר';
  protected readonly getYearFromStringDate = getYearFromStringDate;
  protected readonly getMonthAndDateFromStringDate = getMonthAndYearFromStringDate;
}
