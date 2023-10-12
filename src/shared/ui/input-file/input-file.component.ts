import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UploadPostResponse } from '@shared/api/models';
import { FilesMyHrService } from '@shared/api/services';
import { FileUploadStatusAndId, FileWithLoading } from '@shared/entities';
import { DestroyService } from '@shared/services';
import { TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { BehaviorSubject, of, switchMap, takeUntil } from 'rxjs';

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
  @Input() public multiple: boolean = false;
  @Input() public control: FormControl<FileWithLoading[] | null> = new FormControl([]);
  @Output() public fileUploaded: BehaviorSubject<FileUploadStatusAndId> =
    new BehaviorSubject<FileUploadStatusAndId>({ status: false, id: null });

  public currentFile!: FileWithLoading;
  public id!: string | undefined;
  private status!: 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

  constructor(
    private readonly filesMyHrService: FilesMyHrService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.control.statusChanges.pipe(
      switchMap(value => {
        if (this.control.value?.length === 0) {
          this.fileUploaded.next({ status: false, id: null });
          return of();
        }

        this.currentFile = this.control.value?.at(-1) as FileWithLoading;

        if (!this.currentFile?.isUploaded) {
          this.currentFile.isLoading = true;
          this.currentFile.isUploaded = true;
        }
        this.status = value;
        return this.filesMyHrService.apiUploadPost({ file: this.currentFile });
      }),
      takeUntil(this.destroy$),
    ).subscribe((response: UploadPostResponse) => {
      this.currentFile.isLoading = false;
      if (this.status === 'VALID' && this.control.value?.length) {
        this.fileUploaded.next({ status: true, id: response.opswatId as string });
      } else {
        this.fileUploaded.next({ status: false, id: null });
      }
      this.cdr.detectChanges();
    });
  }

  public removeFile({ name }: File): void {
    this.control.setValue(
      this.control.value?.filter(current => current.name !== name) ?? [],
    );
  }
}
