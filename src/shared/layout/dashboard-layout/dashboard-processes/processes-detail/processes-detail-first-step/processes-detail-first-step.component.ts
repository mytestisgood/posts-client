import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadFilePostResponse } from '@shared/api/models';
import { UploadFileService } from '@shared/api/services';
import {
  DashboardDirection,
  DashboardDirectionEnum,
  FileUploadStatusAndId,
} from '@shared/entities';
import { getCurrentMonth, getCurrentYear } from '@shared/helpers';
import { DataSharingService, DestroyService } from '@shared/services';
import { ButtonComponent, InputFileComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-processes-detail-first-step',
  standalone: true,
  imports: [CommonModule, InputFileComponent, ButtonComponent],
  templateUrl: './processes-detail-first-step.component.html',
  styleUrls: ['./processes-detail-first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailFirstStepComponent {
  @Input() public departmentId!: number;
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public filesControl: FormControl = new FormControl();
  public isDocumentUploaded: boolean = false;
  public dashboardDirectionEnum = DashboardDirectionEnum;
  public opswatId: Array<string> = [];

  constructor(
    private readonly destroy$: DestroyService,
    private readonly uploadFileService: UploadFileService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public doChangeStep(direction: DashboardDirection): void {
    this.uploadFileService.apiProcessesUploadFilePost({
      departmentId: this.departmentId.toString(),
      isDepartmentLink: false,
      isDirect: false,
      isEmployer: true,
      month: getCurrentMonth().toString(),
      processName: null,
      year: getCurrentYear().toString(),
      opswatIds: this.opswatId,
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((result: UploadFilePostResponse) => {
      this.dataSharingService.dashboardProcessUploadFileResult$.next(result);
      this.dataSharingService.isDashboardProcessFileUploaded$.next(true);
      this.changeStep.emit(direction);
    });
  }

  public fileUploaded(uploaded: FileUploadStatusAndId): void {
    if (uploaded.status) {
      this.opswatId.push(uploaded.id as string);
    }
  }
}
