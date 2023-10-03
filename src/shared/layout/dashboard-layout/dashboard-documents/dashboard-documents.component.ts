import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DocumentsGetResponse,
  DocumentsGetResponseItems,
  DocumentTypes,
  FileDataExtResponse,
} from '@shared/api/models';
import { FilesService } from '@shared/api/services';
import { AddDocumentsDialogComponent } from '@shared/dialog';
import {
  DashboardDocumentsAddDocument,
  DashboardDocumentsDownloadFile,
  DashboardHeaderIds,
} from '@shared/entities';
import { formattedCurrentDateTo, toBlobAndSaveFile } from '@shared/helpers';
import { DataSharingService, DestroyService } from '@shared/services';
import { DashboardDocumentsTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  LoaderComponent,
  SelectComponent,
} from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { filter, map, Observable, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-documents',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, DashboardDocumentsTableComponent, SelectComponent,
    InputFieldComponent, InputFileComponent, AddDocumentsDialogComponent, LoaderComponent,
  ],
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsComponent implements OnInit {
  public filesControl: FormControl = new FormControl();
  public documents$!: Observable<DocumentsGetResponseItems[] | null>;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
    private readonly filesService: FilesService,
    private readonly dataSharingService: DataSharingService,
  ) {
  }

  public ngOnInit(): void {
    this.documents$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter(value => !!value.employerId),
      switchMap((value: DashboardHeaderIds) => {
        return this.filesService.apiDocumentsGet({
          checkUnitType: true,
          page: '1',
          limit: '100',
          employerId: value.employerId as string,
        }).pipe(map((response: DocumentsGetResponse) => response?.items ?? null));
      }),
    );
  }

  public openAddDocumentDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, { closeable: false }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onSendRequest(request: DashboardDocumentsAddDocument): void {
    this.filesService.apiDocumentsPost({
      description: request.description,
      date: Number(formattedCurrentDateTo('yyyy-mm-dd')),
      documentType: request.documents as DocumentTypes,
      employer_id: 0,
      opswatIds: request.opswatId,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onDownloadFile(documentData: DashboardDocumentsDownloadFile): void {
    this.filesService.apiDocumentsDocumentIdGet({
      documentId: documentData.id,
      employerId: documentData.employerId,
    }).pipe(
      takeUntil(this.destroy$),
    ).subscribe((response: FileDataExtResponse) => toBlobAndSaveFile(response));
  }
}
