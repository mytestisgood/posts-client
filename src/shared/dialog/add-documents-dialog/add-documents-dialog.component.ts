import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentTypes, FilesMyHrService, InlineResponse20034 } from '@shared/api';
import {
  DashboardDocumentsAddDocument,
  DocumentTypesConstEmployer,
  DocumentTypesEnumEmployer,
  getObjectKeyByValue,
} from '@shared/entities';
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
  public documentTypeControl: FormControl<string | null> = new FormControl();
  public descriptionControl: FormControl<string | null> = new FormControl<string | null>('');
  public documentTypeOption: string[] = Object.values(DocumentTypesEnumEmployer);

  constructor(
    private readonly destroy$: DestroyService,
    private readonly filesMyHrService: FilesMyHrService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public onAddFileClick(): void {
    const documentType: DocumentTypesEnumEmployer = this.documentTypeControl.value as DocumentTypesEnumEmployer;
    const documentTypeEnumControl: string = getObjectKeyByValue(DocumentTypesEnumEmployer, documentType);
    const documentTypeControl: string = getObjectKeyByValue(DocumentTypesConstEmployer, documentTypeEnumControl);

    this.sendRequest.next({
      documents: documentTypeControl as DocumentTypes,
      description: this.descriptionControl.value as string,
      opswatId: this.opswatId,
    });
    this.filesControl.setValue([]);
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
