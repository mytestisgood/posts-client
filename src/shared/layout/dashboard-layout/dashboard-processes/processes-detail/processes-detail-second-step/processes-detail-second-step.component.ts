import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  InlineResponse2002,
  InlineResponse20021,
  InlineResponse20032,
  ProcessesService,
} from '@shared/api';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { toBlobAndSaveFile } from '@shared/helpers';
import { DataSharingService, DestroyService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-processes-detail-second-step',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './processes-detail-second-step.component.html',
  styleUrls: ['./processes-detail-second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailSecondStepComponent implements OnInit {
  @Input() public token!: string;
  @Input() public departmentId!: number;
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public isFileUploaded: boolean = false;
  public processId!: number;
  public dashboardDirectionEnum = DashboardDirectionEnum;

  constructor(
    private readonly processesService: ProcessesService,
    private readonly dataSharingService: DataSharingService,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    this.dataSharingService.dashboardProcessUploadFileResult$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((result: InlineResponse2002 | null) => {
      this.processId = Number(result?.processId);
    });
  }

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

  public downloadPaymentExample(): void {
    this.processesService.apiProcessesDownloadPaymentsInstructionPost(this.token, {
      processId: this.processId,
      isSendMax: false,
      filesList: [],
      department_id: this.departmentId.toString(),
      criteria: {
        isCheckAll: true,
        additionalProperties: {
          processId: this.processId,
          department_id: this.departmentId,
          limit: 1,
          page: 15,
        },
      },
    }).pipe(
      tap((result: InlineResponse20021) => toBlobAndSaveFile(result?.result as InlineResponse20032)),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public uploadPaymentExample(): void {
    this.processesService.apiProcessesSendPaymentsInstructionPost(this.token, {
      processId: this.processId,
      recipient: ['shoshi@smarti.co.il'],
      isSendMax: false,
      filesList: [],
      criteria: {
        isCheckAll: true,
        additionalProperties: {
          processId: this.processId,
          department_id: this.departmentId,
          limit: 1,
          page: 15,
        },
      },
    }).pipe(takeUntil(this.destroy$)).subscribe();
    this.isFileUploaded = true;
  }
}
