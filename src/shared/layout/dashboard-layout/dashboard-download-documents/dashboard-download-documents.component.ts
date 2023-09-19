import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilesService, InlineResponse20034 } from '@shared/api';
import {
  dashboardDownloadDocumentsMapper,
  DashboardDownloadDocumentsModel,
  TOKEN,
} from '@shared/entities';
import { toBlobAndSaveFile } from '@shared/helpers';
import { DestroyService } from '@shared/services';
import { DashboardDownloadDocumentsGridTableComponent } from '@shared/tables';
import { ButtonComponent, InputSearchComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-download-documents',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputSearchComponent,
    DashboardDownloadDocumentsGridTableComponent,
  ],
  templateUrl: './dashboard-download-documents.component.html',
  styleUrls: ['./dashboard-download-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDownloadDocumentsComponent implements OnInit {
  public downloadDocuments: DashboardDownloadDocumentsModel[] = dashboardDownloadDocumentsMapper;
  public files!: DashboardDownloadDocumentsModel[];
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public controlSearch: FormControl<string | null> = new FormControl<string>('');

  constructor(
    private readonly filesService: FilesService,
    private readonly localStorageService: LocalStorageService,
    private readonly destroy$: DestroyService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.files = this.downloadDocuments;
    this.controlSearch.valueChanges.pipe(
      debounceTime(500),
      takeUntil(this.destroy$),
    ).subscribe(searchValue => {
      this.files = this.downloadDocuments.filter((file: DashboardDownloadDocumentsModel) =>
        file.title.toLowerCase().indexOf(searchValue?.toLowerCase() as string) > -1);
      this.changeDetectorRef.detectChanges();
    });
  }

  public onDownloadFile(file: DashboardDownloadDocumentsModel): void {
    this.filesService.apiGeneralsDownloadExampleFilePost(
      this.token,
      { filename: file.name },
    ).pipe(takeUntil(this.destroy$))
      .subscribe((response: InlineResponse20034) => toBlobAndSaveFile(response));
  }

  public downloadSelectedDocuments(): void {
    this.files.forEach((item: DashboardDownloadDocumentsModel) => {
      if (item.isSelected) {
        this.filesService.apiGeneralsDownloadExampleFilePost(
          this.token,
          { filename: item.name },
        ).pipe(takeUntil(this.destroy$))
          .subscribe((response: InlineResponse20034) => toBlobAndSaveFile(response));
      }
    });
  }
}
