import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFileLike, TuiInputFilesModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { BehaviorSubject } from 'rxjs';

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
  @Output() fileUploaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  readonly control = new FormControl();

  readonly file: TuiFileLike = {
    name: 'custom.txt',
  };

  public ngOnInit(): void {
    this.control.valueChanges.pipe().subscribe(value => {
      this.fileUploaded.next(true);
    })
  }

  removeFile(): void {
    this.control.setValue(null);
  }
}
