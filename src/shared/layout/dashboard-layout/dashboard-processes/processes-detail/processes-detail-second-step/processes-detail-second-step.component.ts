import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { downloadFileHelper } from '@shared/helpers';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-processes-detail-second-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './processes-detail-second-step.component.html',
  styleUrls: ['./processes-detail-second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailSecondStepComponent {
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public isFileUploaded: boolean = false;
  public dashboardDirectionEnum = DashboardDirectionEnum;

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

  public downloadPaymentExample(): void {
    downloadFileHelper('/assets/files/דוגמה.xlsx', 'דוגמה.xlsx');
  }

  public uploadPaymentExample(): void {
    this.isFileUploaded = true;
  }
}
