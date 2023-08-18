import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-processes-detail-fifth-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './processes-detail-fifth-step.component.html',
  styleUrls: ['./processes-detail-fifth-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailFifthStepComponent {
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();

  public dashboardDirectionEnum = DashboardDirectionEnum;

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

}
