import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DocumentTypes } from '@shared/api/models';
import {
  DashboardDocumentsAddDocument,
  DocumentTypesConstEmployer,
  DocumentTypesEnumEmployer,
  FileUploadStatusAndId,
} from '@shared/entities';
import { getObjectKeyByValue } from '@shared/helpers';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  SelectComponent,
} from '@shared/ui';
import { Subject } from 'rxjs';

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

  public fileUploaded(uploaded: FileUploadStatusAndId): void {
    if (uploaded.status) {
      this.opswatId = uploaded.id as string;
      this.isDocumentUploaded = uploaded.status;
    }
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
