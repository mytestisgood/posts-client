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
  ContactsService, InlineResponse20022,
  InlineResponse2003,
  InlineResponse20033,
  ProcessesService,
} from '@shared/api';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { toBlobAndSaveFile } from '@shared/helpers';
import { DataSharingService, DestroyService } from '@shared/services';
import { ButtonComponent } from '@shared/ui';
import { switchMap, takeUntil, tap } from 'rxjs';

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
    private readonly contactsService: ContactsService,
  ) {
  }

  public ngOnInit(): void {
    this.dataSharingService.dashboardProcessUploadFileResult$.pipe(
      takeUntil(this.destroy$),
    ).subscribe((result: InlineResponse2003 | null) => {
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
      tap((result: InlineResponse20022) => toBlobAndSaveFile(result?.result as InlineResponse20033)),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public uploadPaymentExample(): void {
    this.contactsService.apiContactsTypeGetEmailEmployerContactGet(
      this.departmentId.toString(),
      '2',
      '2',
      this.token,
    ).pipe(
      switchMap(response => {
        return this.processesService.apiProcessesSendPaymentsInstructionPost(this.token, {
          processId: this.processId,
          recipient: response,
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
        });
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => this.isFileUploaded = true);
  }
}
