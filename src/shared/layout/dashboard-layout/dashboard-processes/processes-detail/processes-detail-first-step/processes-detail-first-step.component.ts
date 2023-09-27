import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { UploadFilePostResponse, UploadPostResponse } from '@shared/api/models';
import { FilesMyHrService, UploadFileService } from '@shared/api/services';
import { DashboardDirection, DashboardDirectionEnum } from '@shared/entities';
import { getCurrentMonth, getCurrentYear } from '@shared/helpers';
import { DataSharingService, DestroyService } from '@shared/services';
import { ButtonComponent, InputFileComponent } from '@shared/ui';
import { takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-processes-detail-first-step',
  standalone: true,
  imports: [CommonModule, InputFileComponent, ButtonComponent],
  templateUrl: './processes-detail-first-step.component.html',
  styleUrls: ['./processes-detail-first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailFirstStepComponent {
  @Input() public token!: string;
  @Input() public departmentId!: number;
  @Output() public changeStep: EventEmitter<DashboardDirection> = new EventEmitter<DashboardDirection>();
  public filesControl: FormControl = new FormControl();
  public isDocumentUploaded: boolean = false;
  public dashboardDirectionEnum = DashboardDirectionEnum;
  public opswatId: Array<string> = [];

  constructor(
    private readonly destroy$: DestroyService,
    private readonly uploadFileService: UploadFileService,
    private readonly filesMyHrService: FilesMyHrService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public doChangeStep(direction: DashboardDirection): void {
    this.uploadFileService.apiProcessesUploadFilePost({
      token: this.token,
      processesUploadFileBody: {
        departmentId: this.departmentId.toString(),
        isDepartmentLink: false,
        isDirect: false,
        isEmployer: true,
        month: getCurrentMonth().toString(),
        processName: 'upload file from',
        year: getCurrentYear().toString(),
        opswatIds: this.opswatId,
      },
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((result: UploadFilePostResponse) => {
      this.dataSharingService.dashboardProcessUploadFileResult$.next(result);
      this.dataSharingService.isDashboardProcessFileUploaded$.next(true);
      this.changeStep.emit(direction);
    });
  }

  public fileUploaded(isUploaded: boolean): void {
    if (isUploaded) {
      this.filesMyHrService.apiUploadPost({
        file: this.filesControl.value,
        project: 'smarti-dev',
      }).pipe(
        tap((response: UploadPostResponse) => {
          this.opswatId.push(response.opswatId as string);
          this.isDocumentUploaded = isUploaded;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.destroy$),
      ).subscribe();
    }
  }
}
