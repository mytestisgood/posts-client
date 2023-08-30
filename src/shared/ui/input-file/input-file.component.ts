import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { FilesMyHrService, InlineResponse20029 } from '@shared/api';
import { DestroyService } from '@shared/services';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFileState, TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
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
  ],
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFileComponent implements OnInit {
  @Input() public customWidth!: string;
  @Input() public customHeight!: string;
  @Input() public multiple: boolean = false;
  @Input() public control: FormControl<File[] | null> = new FormControl([]);
  @Output() public fileUploaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isLoading: TuiFileState = 'loading';

  constructor(
    private readonly filesMyHrService: FilesMyHrService,
    private readonly destroy$: DestroyService
  ) {
  }

  public ngOnInit(): void {
    this.filesMyHrService.apiStatusGet();
    this.control.valueChanges.pipe(
      switchMap(value => {
        if (value === null) {
          return of()
        }

        return this.filesMyHrService.apiUploadPost('smarti-dev', { file: value.at(-1) })
      }),
      takeUntil(this.destroy$),
    ).subscribe((response: InlineResponse20029) => console.log(response));
    // this.control.valueChanges.pipe(
    //   switchMap(value => fileFromBlotToTextFormatHelper(value as File[])),
    //   switchMap(value=> this.filesMyHrService.apiUploadPost(value)),
    //   takeUntil(this.destroy$),
    // ).subscribe((response: InlineResponse20029) => console.log(response));
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
