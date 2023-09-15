import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import {
  DashboardDirection,
  DashboardDirectionEnum,
  DashboardStep,
  DashboardStepEnum,
  DEPARTMENT_ID,
  REGISTRATION_TOKEN,
} from '@shared/entities';
import { LocalStorageService } from '@shared/web-api';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ProcessesDetailFifthStepComponent,
} from './processes-detail-fifth-step/processes-detail-fifth-step.component';
import {
  ProcessesDetailFirstStepComponent,
} from './processes-detail-first-step/processes-detail-first-step.component';
import {
  ProcessesDetailFourthStepComponent,
} from './processes-detail-fourth-step/processes-detail-fourth-step.component';
import {
  ProcessesDetailHeaderComponent,
} from './processes-detail-header/processes-detail-header.component';
import {
  ProcessesDetailInformationComponent,
} from './processes-detail-information/processes-detail-information.component';
import {
  ProcessesDetailSecondStepComponent,
} from './processes-detail-second-step/processes-detail-second-step.component';
import {
  ProcessesDetailThirdStepComponent,
} from './processes-detail-third-step/processes-detail-third-step.component';

@Component({
  selector: 'smarti-processes-detail',
  standalone: true,
  imports: [
    CommonModule,
    ProcessesDetailHeaderComponent,
    ProcessesDetailInformationComponent,
    ProcessesDetailFirstStepComponent,
    ProcessesDetailSecondStepComponent,
    ProcessesDetailThirdStepComponent,
    ProcessesDetailFourthStepComponent,
    ProcessesDetailFifthStepComponent,
  ],
  templateUrl: './processes-detail.component.html',
  styleUrls: ['./processes-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailComponent {
  @Output() public changingStep: BehaviorSubject<DashboardStep> =
    new BehaviorSubject<DashboardStep>(DashboardStepEnum.FifthStep);

  public departmentId: number = Number(this.localStorageService.getItem(DEPARTMENT_ID));
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public readonly currentStepBs: BehaviorSubject<DashboardStep> =
    new BehaviorSubject<DashboardStep>(DashboardStepEnum.FirstStep);
  public currentStep$: Observable<DashboardStep> = this.currentStepBs.asObservable();
  public dashboardStepEnum = DashboardStepEnum;

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  public changeStep(currentStep: string, direction: DashboardDirection): void {
    switch (currentStep) {
      case DashboardStepEnum.FirstStep:
        if (direction === DashboardDirectionEnum.Forward) {
          this.currentStepBs.next(DashboardStepEnum.SecondStep);
          this.changingStep.next(DashboardStepEnum.SecondStep);
        }
        break;
      case DashboardStepEnum.SecondStep:
        if (direction === DashboardDirectionEnum.Forward) {
          this.currentStepBs.next(DashboardStepEnum.ThirdStep);
          this.changingStep.next(DashboardStepEnum.ThirdStep);
        }
        if (direction === DashboardDirectionEnum.Back) {
          this.currentStepBs.next(DashboardStepEnum.FirstStep);
          this.changingStep.next(DashboardStepEnum.FirstStep);
        }
        break;
      case DashboardStepEnum.ThirdStep:
        if (direction === DashboardDirectionEnum.Forward) {
          this.currentStepBs.next(DashboardStepEnum.FourthStep);
          this.changingStep.next(DashboardStepEnum.FourthStep);
        }
        if (direction === DashboardDirectionEnum.Back) {
          this.currentStepBs.next(DashboardStepEnum.SecondStep);
          this.changingStep.next(DashboardStepEnum.SecondStep);
        }
        break;
      case DashboardStepEnum.FourthStep:
        if (direction === DashboardDirectionEnum.Forward) {
          this.currentStepBs.next(DashboardStepEnum.FifthStep);
          this.changingStep.next(DashboardStepEnum.FifthStep);
        }
        if (direction === DashboardDirectionEnum.Back) {
          this.currentStepBs.next(DashboardStepEnum.ThirdStep);
          this.changingStep.next(DashboardStepEnum.ThirdStep);
        }
        break;
      case DashboardStepEnum.FifthStep:
        if (direction === DashboardDirectionEnum.Back) {
          this.currentStepBs.next(DashboardStepEnum.FourthStep);
          this.changingStep.next(DashboardStepEnum.FourthStep);
        }
    }
  }
}
