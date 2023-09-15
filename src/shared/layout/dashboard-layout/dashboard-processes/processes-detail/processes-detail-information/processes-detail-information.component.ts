import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UploadFileService } from '@shared/api';
import { DataSharingService } from '@shared/services';
import { combineLatest, of, switchMap } from 'rxjs';

@Component({
  selector: 'smarti-processes-detail-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './processes-detail-information.component.html',
  styleUrls: ['./processes-detail-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessesDetailInformationComponent {
  @Input() public token!: string;
  @Input() public departmentId!: number;
  public emptyData: boolean = false;

  public detailInformation$ = combineLatest([
    this.dataSharingService.dashboardProcessUploadFileResult$,
    this.dataSharingService.isDashboardProcessFileUploaded$,
  ]).pipe(
    switchMap(([uploadFileResult, isFileUploaded]) => {
      if (uploadFileResult?.processId && isFileUploaded) {
        this.emptyData = false;
        return this.uploadFileService.apiProcessesUploadFileGet(
          this.departmentId.toString(),
          uploadFileResult.processId,
          this.token,
        );
      }

      this.emptyData = true;
      return of({ emptyData: true });
    }),
  );

  constructor(
    private readonly uploadFileService: UploadFileService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }
}
