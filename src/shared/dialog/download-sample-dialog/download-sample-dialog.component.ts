import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {downloadFileHelper} from '@shared/helpers';

@Component({
  selector: 'smarti-download-sample-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './download-sample-dialog.component.html',
  styleUrls: ['./download-sample-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DownloadSampleDialogComponent {
  @Input() public observer!: { complete: () => void };

  public closeDialog(): void {
    this.observer.complete();
  }

  public downloadXlExample(type: string): void {
    type === 'xlsx' ? downloadFileHelper('/assets/files/דוגמה.xlsx', 'דוגמה.xlsx') : downloadFileHelper('/assets/files/דוגמה.dat', 'דוגמה.dat');
  }
}
