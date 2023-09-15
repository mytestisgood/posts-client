import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DocumentTypes,
  FilesService,
  InlineResponse20031,
  InlineResponse20031Items,
  InlineResponse20032,
} from '@shared/api';
import { AddDocumentsDialogComponent } from '@shared/dialog';
import {
  DashboardDocumentsAddDocument,
  DashboardDocumentsDownloadFile,
  REGISTRATION_TOKEN,
} from '@shared/entities';
import { formattedCurrentDateTo, toBlobAndSaveFile } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { DashboardDocumentsTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { map, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-documents',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, DashboardDocumentsTableComponent, SelectComponent,
    InputFieldComponent, InputFileComponent, AddDocumentsDialogComponent,
  ],
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsComponent {
  public filesControl: FormControl = new FormControl();
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public documents$: Observable<InlineResponse20031Items[] | null> = this.filesService.apiDocumentsGet(
    true,
    '',
    '1',
    '10',
    this.token,
  ).pipe(map((response: InlineResponse20031) => response?.items ?? null));

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly filesService: FilesService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public openAddDocumentDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, { closeable: false }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onSendRequest(request: DashboardDocumentsAddDocument): void {
    this.filesService.apiDocumentsPost(this.token, {
      description: request.description,
      date: formattedCurrentDateTo('yyyy-mm-dd'),
      documentType: request.documents as DocumentTypes,
      employer_id: 0,
      opswatIds: request.opswatId,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onDownloadFile(documentData: DashboardDocumentsDownloadFile): void {
    this.filesService.apiDocumentsDocumentIdGet(documentData.id, documentData.employerId, this.token).pipe(
      takeUntil(this.destroy$),
    ).subscribe((response: InlineResponse20032) => toBlobAndSaveFile(response));
  }
}
