import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardDirection } from '@shared/entities';
import {
  ButtonComponent,
  InputCheckboxComponent,
  InputDateComponent,
  RadioBlockPaymentComponent,
} from '@shared/ui';

@Component({
  selector: 'smarti-processes-detail-third-step',
  standalone: true,
  imports: [
    CommonModule, InputDateComponent, RadioBlockPaymentComponent, ButtonComponent,
    InputCheckboxComponent,
  ],
  templateUrl: './processes-detail-third-step.component.html',
  styleUrls: ['./processes-detail-third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailThirdStepComponent {
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public date: FormControl = new FormControl();

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

  public onClickEditPayment(item: string): void {
    item.length;
  }
}
