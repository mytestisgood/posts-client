import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { ButtonComponent, InputFileComponent } from '@shared/ui';

@Component({
  selector: 'smarti-processes-detail-first-step',
  standalone: true,
  imports: [CommonModule, InputFileComponent, ButtonComponent],
  templateUrl: './processes-detail-first-step.component.html',
  styleUrls: ['./processes-detail-first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailFirstStepComponent {
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public filesControl: FormControl = new FormControl();
  public isDocumentUploaded: boolean = false;
  public dashboardDirectionEnum = DashboardDirectionEnum;

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

  public fileUploaded(isUploaded: boolean): void {
    this.isDocumentUploaded = isUploaded;
  }
}
