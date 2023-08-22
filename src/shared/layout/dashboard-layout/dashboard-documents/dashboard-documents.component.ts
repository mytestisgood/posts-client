import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DestroyService } from '@shared/services';
import { DashboardDocumentsTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  InputFieldComponent,
  InputFileComponent,
  SelectComponent,
} from '@shared/ui';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-documents',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, DashboardDocumentsTableComponent, SelectComponent,
    InputFieldComponent, InputFileComponent,
  ],
  templateUrl: './dashboard-documents.component.html',
  styleUrls: ['./dashboard-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardDocumentsComponent {
  public isDocumentUploaded: boolean = false;
  public filesControl: FormControl = new FormControl();

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly destroy$: DestroyService,
  ) {}

  public openAddDocumentDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, { closeable: false }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public onAddFileClick(observer: { complete: () => void }): void {
    observer.complete();
  }
  public fileUploaded(isUploaded: boolean): void {
    this.isDocumentUploaded = isUploaded;
  }

  public closeDialog(observer: { complete: () => void }): void {
    observer.complete();
  }
}
