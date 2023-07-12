import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFileLike, TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';

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
export class InputFileComponent {
  @Input() public customWidth!: string;
  @Input() public customHeight!: string;

  readonly control = new FormControl();

  readonly file: TuiFileLike = {
    name: 'custom.txt',
  };
}
