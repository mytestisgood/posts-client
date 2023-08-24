import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardChatAddFileGroupControls } from '@shared/entities';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFileComponent,
  InputTextareaComponent,
  SelectComponent,
} from '@shared/ui';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'smarti-add-file-chat-dialog',
  standalone: true,
  imports: [
    CommonModule, SelectComponent, InputTextareaComponent, InputFileComponent,
    ButtonComponent, ReactiveFormsModule,
  ],
  templateUrl: './add-file-chat-dialog.component.html',
  styleUrls: ['./add-file-chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFileChatDialogComponent implements OnInit {
  @Input() public form!: FormGroup<DashboardChatAddFileGroupControls>;
  @Input() public observer!: { complete: () => void };
  @Output() public sendRequest: Subject<void> = new Subject();

  public isDocumentUploaded: boolean = false;
  public hideDocumentType: boolean = true;
  public hideBlockWithCashAndEmployee: boolean = true;

  constructor(private readonly $destroy: DestroyService) {
  }

  public ngOnInit(): void {
    this.form.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(value => {
      if (value.document) {
        this.hideDocumentType = false;
      }
      if (value.document && value.documentType) {
        this.hideBlockWithCashAndEmployee = false;
      }
    });
  }

  public onAddFileClick(): void {
    this.observer.complete();
  }
  public fileUploaded(isUploaded: boolean): void {
    this.isDocumentUploaded = isUploaded;
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
