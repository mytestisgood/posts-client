import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UploadPostResponse } from '@shared/api/models';
import { FilesMyHrService } from '@shared/api/services';
import { FileUploadStatusAndId, FileWithLoading } from '@shared/entities';
import { takeRight } from '@shared/helpers';
import { AlertsService, DestroyService } from '@shared/services';
import { TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  forkJoin,
  Observable,
  of,
  switchMap,
  takeUntil,
} from 'rxjs';

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
export class InputFileComponent implements AfterViewInit {
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
    private readonly filesMyHrService: FilesMyHrService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef,
    private readonly alertsService: AlertsService,
  ) {
  }

  public ngAfterViewInit(): void {
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

  private fileStatusChanges(): void {
    combineLatest([
      this.control.statusChanges,
      this.control.valueChanges,
    ]).pipe(
      switchMap(([status]) => {
        this.status = status;
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
        this.alertsService.showErrorNotificationIcon('הקובץ לא נקלט. יש להעלות את הקובץ מחדש');
        return of(err);
      }),
      takeUntil(this.destroy$),
    )
      .subscribe((response: UploadPostResponse[]) => {
        if (this.status === 'VALID' && this.control.value?.length && response.length) {
          response.forEach(res => {
            const indexToUpdate = this.currentFilesArray.findIndex((item: FileWithLoading) => item.isLoading);

            this.currentFilesArray[indexToUpdate].isLoading = false;
            this.alertsService.showSuccessNotificationIcon('הקובץ נקלט בהצלחה');
            this.fileUploaded.next({ status: true, id: res.opswatId as string });
          });
        } else {
          this.currentFilesArray.forEach(file => {
            if (file.isLoading) {
              this.control.setValue(
                this.control.value?.filter(current => current.index !==  file.index) ?? [],
              );
            }
            this.fileUploaded.next({ status: false, id: null });
          });
          this.currentFilesArray = this.currentFilesArray.filter(file => !file.isLoading);
          if (this.control.value?.length === 0) {
            this.isSecondFileUpload = false;
          }
        }
        this.control.updateValueAndValidity({ emitEvent: true });
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
