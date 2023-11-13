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
  DownloadPaymentsInstructionResponse,
  FileDataExtResponse,
  UploadFilePostResponse,
} from '@shared/api/models';
import { ContactsService, ProcessesService } from '@shared/api/services';
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
    ).subscribe((result: UploadFilePostResponse | null) => {
      this.processId = Number(result?.processId);
    });
  }

  public doChangeStep(direction: DashboardDirection): void {
    this.changeStep.emit(direction);
  }

  public downloadPaymentExample(): void {
    this.processesService.apiProcessesDownloadPaymentsInstructionPost({
      processId: this.processId,
      department_id: this.departmentId.toString(),
    }).pipe(
      tap((result: DownloadPaymentsInstructionResponse) => {
          (result as Array<FileDataExtResponse>).forEach(file => {
            toBlobAndSaveFile(file as FileDataExtResponse);
          });
        },
      ),
      takeUntil(this.destroy$),
    ).subscribe();
  }

  public uploadPaymentExample(): void {
    this.contactsService.apiContactsTypeGetEmailEmployerContactGet({
      departmentId: this.departmentId.toString(),
      type: '2',
      employerId: '2',
    }).pipe(
      switchMap(response => {
        return this.processesService.apiProcessesSendPaymentsInstructionPost({
          processId: this.processId,
          isSendMax: false,
          recipient: response,
          criteria: {
            isCheckAll: true,
            additionalProperties: {
              processId: this.processId,
              department_id: this.departmentId,
              page: 1,
              limit: 15,
            },
          },
        });
      }),
      takeUntil(this.destroy$),
    ).subscribe(() => this.isFileUploaded = true);
  }
}
