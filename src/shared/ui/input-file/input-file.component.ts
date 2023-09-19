import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { FilesMyHrService, InlineResponse20035 } from '@shared/api';
import { FileWithLoading } from '@shared/entities';
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
  @Output() public fileUploaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public currentFile!: FileWithLoading;
  public id!: string | undefined;

  constructor(
    private readonly filesMyHrService: FilesMyHrService,
    private readonly destroy$: DestroyService,
    private readonly cdr: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.filesMyHrService.apiStatusGet();
    this.control.valueChanges.pipe(
      switchMap(value => {
        if (value?.length === 0) {
          return of();
        }

        this.currentFile = value?.at(-1) as FileWithLoading;

        if (!this.currentFile?.isUploaded) {
          this.currentFile.isLoading = true;
          this.currentFile.isUploaded = true;
        }

        return this.filesMyHrService.apiUploadPost('smarti-dev', this.currentFile);
      }),
      takeUntil(this.destroy$),
    )
      .subscribe((response: InlineResponse20035) => {
          this.id = response.opswatId;
          this.currentFile.isLoading = false;
          this.cdr.detectChanges();
      });
    this.control.statusChanges.pipe(
      takeUntil(this.destroy$),
    ).subscribe((status: FormControlStatus) => {
      if (status === 'VALID' && this.control.value?.length) {
        this.fileUploaded.next(true);
      } else {
        this.fileUploaded.next(false);
      }
    });
  }

  public removeFile({ name }: File): void {
    this.control.setValue(
      this.control.value?.filter(current => current.name !== name) ?? [],
    );
  }
}
