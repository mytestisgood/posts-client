import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  DashboardHeaderBackgroundClass,
  DashboardHeaderCountClass,
  DashboardStep, DashboardTriangleClass,
} from '@shared/entities';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'smarti-processes-detail-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processes-detail-header.component.html',
  styleUrls: ['./processes-detail-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailHeaderComponent {
  @Input() public currentStep!: BehaviorSubject<DashboardStep>;

  public changeBackgroundClass(itemCount: number, step: string): string | DashboardHeaderBackgroundClass {
    switch (itemCount) {
      case 2:
        return {
          'bgNeutrals950': step === 'thirdStep' || step === 'fourthStep' || step === 'fifthStep',
          'bgBrightTurquoise500': step === 'secondStep',
          'bgNeutrals100': step === 'firstStep',
        };

      case 3:
        return {
          'bgNeutrals950': step === 'fourthStep' || step === 'fifthStep',
          'bgBrightTurquoise500': step === 'thirdStep',
          'bgNeutrals100': step === 'firstStep' || step === 'secondStep',
        };

      case 4:
        return {
          'bgNeutrals950': step === 'fifthStep',
          'bgBrightTurquoise500': step === 'fourthStep',
          'bgNeutrals100': step === 'firstStep' || step === 'secondStep' || step === 'thirdStep',
        };

      default:
        return step === 'firstStep' ? 'bgBrightTurquoise500' : 'bgNeutrals950';
    }
  }

  public changeCountNumberClass(itemCount: number, step: string): string | DashboardHeaderCountClass {
    switch (itemCount) {
      case 2:
        return {
          'acceptBorderedIcon': step === 'thirdStep' || step === 'fourthStep' || step === 'fifthStep',
          'secondRoundedFillIcon': step === 'secondStep',
          'secondRoundedIcon': step === 'firstStep',
        };

      case 3:
        return {
          'acceptBorderedIcon': step === 'fourthStep' || step === 'fifthStep',
          'thirdRoundedFillIcon': step === 'thirdStep',
          'thirdRoundedIcon': step === 'firstStep' || step === 'secondStep',
        };

      case 4:
        return {
          'acceptBorderedIcon': step === 'fifthStep',
          'fourthRoundedFillIcon': step === 'fourthStep',
          'fourthRoundedIcon': step === 'firstStep' || step === 'secondStep' || step === 'thirdStep',
        };

      default:
        return step === 'firstStep' ? 'firstRoundedFillIcon' : 'acceptBorderedIcon';
    }
  }

  public changeTriangleClass(itemCount: number, step: string): string | DashboardTriangleClass {
    switch (itemCount) {
      case 2:
        return {
          'blackTriangleLeft': step === 'thirdStep' || step === 'fourthStep' || step === 'fifthStep',
          'brightTurquoiseTriangleLeft': step === 'secondStep',
          'brightTurquoiseTriangleLeftDisabled': step === 'firstStep',
        };

      case 3:
        return {
          'blackTriangleLeft': step === 'fourthStep' || step === 'fifthStep',
          'brightTurquoiseTriangleLeft': step === 'thirdStep',
          'brightTurquoiseTriangleLeftDisabled': step === 'firstStep' || step === 'secondStep',
        };

      default:
        return step === 'firstStep' ? 'brightTurquoiseTriangleLeft' : 'blackTriangleLeft';
    }
  }
}
