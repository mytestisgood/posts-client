import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { ButtonComponent } from '@shared/ui';
@Component({
  selector: 'smarti-processes-detail-fourth-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './processes-detail-fourth-step.component.html',
  styleUrls: ['./processes-detail-fourth-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailFourthStepComponent {
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();

  public dashboardDirectionEnum = DashboardDirectionEnum;

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }
}
