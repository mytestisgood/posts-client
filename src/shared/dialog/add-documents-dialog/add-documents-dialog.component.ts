import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilesMyHrService, InlineResponse20034 } from '@shared/api';
import { DashboardDocumentsAddDocument } from '@shared/entities';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  SelectComponent,
} from '@shared/ui';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-add-documents-dialog',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, InputFieldComponent, InputFileComponent,
    SelectComponent,
  ],
  templateUrl: './add-documents-dialog.component.html',
  styleUrls: ['./add-documents-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddDocumentsDialogComponent {
  @Input() public filesControl: FormControl = new FormControl();
  @Input() public observer!: { complete: () => void };
  @Output() public sendRequest: Subject<DashboardDocumentsAddDocument> = new Subject<DashboardDocumentsAddDocument>();

  public isDocumentUploaded: boolean = false;
  public opswatId!: string;
  public descriptionControl: FormControl<string | null> = new FormControl<string | null>('');
  public documentTypeControl: FormControl<string | null> = new FormControl<string | null>('');

  constructor(
    private readonly destroy$: DestroyService,
    private readonly filesMyHrService: FilesMyHrService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public onAddFileClick(): void {
    this.sendRequest.next({
      documents: this.documentTypeControl.value as string,
      description: this.descriptionControl.value as string,
      opswatId: this.opswatId,
    });
    this.observer.complete();
  }

  public fileUploaded(isUploaded: boolean): void {
    if (isUploaded) {
      this.filesMyHrService.apiUploadPost('smarti-dev', this.filesControl.value).pipe(
        tap((response: InlineResponse20034) => {
          this.opswatId = response.opswatId as string;
          this.isDocumentUploaded = isUploaded;
          this.changeDetectorRef.detectChanges();
        }),
        takeUntil(this.destroy$),
      ).subscribe();
    }
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
