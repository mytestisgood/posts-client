import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UploadDocumentComponent } from '@feature';

@Component({
  selector: 'smarti-upload-file',
  standalone: true,
  imports: [CommonModule, UploadDocumentComponent],
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadFileComponent {

  constructor(
  ) {
  }
}
