import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { UploadPostResponse } from '@shared/api/models';
import { FilesMyHrService } from '@shared/api/services';
import { FileUploadStatusAndId, FileWithLoading } from '@shared/entities';
import { takeRight } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { TuiAlertService, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { BehaviorSubject, catchError, forkJoin, Observable, of, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-input-file',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputFilesModule,
    ReactiveFormsModule,
    TuiMarkerIconModule,
    TuiLinkModule,
    TuiSvgModule,
    TuiLoaderModule,
  ],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent implements OnInit {
  @Input() public customWidth!: string;
  @Input() public customHeight!: string;
  @Input() public control: FormControl<FileWithLoading[] | null> = new FormControl([]);
  @Output() public fileUploaded: BehaviorSubject<FileUploadStatusAndId> =
    new BehaviorSubject<FileUploadStatusAndId>({ status: false, id: null });
  public currentFilesArray: FileWithLoading[] = [];
  public id!: string | undefined;
  public isSecondFileUpload: boolean = false;
  public currentFilesIndex: number = 0;
  private status!: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

  constructor(
    @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
    private readonly filesMyHrService: FilesMyHrService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.fileStatusChanges();
  }

  public removeFile(file: FileWithLoading): void {
    this.control.setValue(
      this.control.value?.filter(current => current.index !== file.index) ?? [],
    );
  }

  public uploadSecondFile(file: HTMLInputElement): void {
    const files: FileWithLoading[] = Array.from(file.files as FileList) as FileWithLoading[];

    this.control.setValue([...this.control.value as FileWithLoading[], ...files]);
    this.control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  }

  public showSuccessNotificationIcon(): void {
    this.alerts.open('הקובץ נקלט בהצלחה', {
      autoClose: true,
      hasCloseButton: false,
      status: 'success',
      icon: '/assets/svg/success-notification-icon-32.svg',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public showErrorNotificationIcon(): void {
    this.alerts.open('הקובץ לא נקלט. יש להעלות את הקובץ מחדש', {
      autoClose: true,
      hasCloseButton: false,
      status: 'error',
      icon: '/assets/svg/error-notification-icon-32.svg',
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  private fileStatusChanges(): void {
    this.control.statusChanges.pipe(
      switchMap((value: FormControlStatus) => {
        this.status = value;
        if (this.control.value) {
          if (this.control.value?.length > this.currentFilesIndex) {
            const uploadedFileLength = this.control.value?.length - this.currentFilesIndex;
            const takeArrayOfNewFiles = takeRight(this.control.value, uploadedFileLength);
            const arrUploaded$: Observable<UploadPostResponse>[] = [];

            takeArrayOfNewFiles.forEach(item => {
              this.fileIncrease(item as FileWithLoading);
              arrUploaded$.push(this.filesMyHrService.apiUploadPost({ file: item }));
            });

            return forkJoin(arrUploaded$);
          }
          if (this.control.value?.length === 0) {
            this.currentFilesIndex--;
            this.fileUploaded.next({ status: false, id: null });
            this.isSecondFileUpload = false;
            return of();
          }

          this.currentFilesIndex--;
          return of();
        }

        return of();
      }),
      catchError((err) => {
        this.showErrorNotificationIcon();
        return of(err);
      }),
      takeUntil(this.destroy$),
    ).subscribe((response: UploadPostResponse[]) => {
      if (this.status === 'VALID' && this.control.value?.length) {
        response.forEach(res => {
          const indexToUpdate = this.currentFilesArray.findIndex((item: FileWithLoading) => item.isLoading);

          this.currentFilesArray[indexToUpdate].isLoading = false;
          this.showSuccessNotificationIcon();
          this.fileUploaded.next({ status: true, id: res.opswatId as string });
        });
      } else {
        this.showErrorNotificationIcon();
        this.fileUploaded.next({ status: false, id: null });
      }
      this.cdr.detectChanges();
    });
  }

  private fileIncrease(file: FileWithLoading): void {
    this.currentFilesIndex++;
    this.currentFilesArray.push(file);
    const index: number = this.currentFilesArray.length - 1;

    this.isSecondFileUpload = true;
    if (!this.currentFilesArray[index].isUploaded) {
      this.currentFilesArray[index].isLoading = true;
      this.currentFilesArray[index].isUploaded = true;
      this.currentFilesArray[index].index = index;
    }
  }
}
