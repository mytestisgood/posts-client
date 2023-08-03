import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormControlStatus, ReactiveFormsModule } from '@angular/forms';
import { DestroyService } from '@shared/services';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFileLike, TuiFileState, TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { BehaviorSubject, takeUntil } from 'rxjs';

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
  @Input() public control: FormControl<TuiFileLike[] | null> = new FormControl([]);
  @Output() public fileUploaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public isLoading: TuiFileState = 'loading';

  constructor(private readonly destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    this.control.statusChanges.pipe(
      takeUntil(this.destroy$),
    ).subscribe((status: FormControlStatus) => {
      if (status === 'VALID') {
        this.fileUploaded.next(true);
      } else {
        this.fileUploaded.next(false);
      }
    });
  }

  public removeFile({ name }: File | TuiFileLike): void {
    this.control.setValue(
      this.control.value?.filter(current => current.name !== name) ?? [],
    );
  }
}
