import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ChatService,
  FilesMyHrService,
  InlineResponse20035,
  InlineResponse20039,
} from '@shared/api';
import { DashboardCreateNewChatGroupControls } from '@shared/entities';
import { DestroyService } from '@shared/services';
import {
  ButtonComponent,
  InputFileComponent,
  InputTextareaComponent,
  SelectComponent,
} from '@shared/ui';
import { Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'smarti-create-new-chat-dialog',
  standalone: true,
  imports: [
    CommonModule, SelectComponent, InputTextareaComponent, InputFileComponent,
    ButtonComponent, ReactiveFormsModule,
  ],
  templateUrl: './create-new-chat-dialog.component.html',
  styleUrls: ['./create-new-chat-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNewChatDialogComponent implements OnInit {
  @Input() public form!: FormGroup<DashboardCreateNewChatGroupControls>;
  @Input() public token!: string;
  @Input() public observer!: { complete: () => void };
  @Output() public sendRequest: Subject<string> = new Subject();

  public isDocumentUploaded: boolean = false;
  public hideDocumentType: boolean = true;
  public hideBlockWithCashAndEmployee: boolean = true;
  public chatSubject$: Observable<InlineResponse20039[]> = this.chatService.apiChatsGetChatSubjectsGet(this.token);
  public chatSubjectOption!: InlineResponse20039[];
  public tatSubjectOption!: InlineResponse20039[];

  constructor(
    private readonly destroy$: DestroyService,
    private readonly chatService: ChatService,
    private readonly filesMyHrService: FilesMyHrService,
  ) {
  }

  public ngOnInit(): void {
    this.chatSubject$.subscribe((response: InlineResponse20039[]) => this.chatSubjectOption = response);
    this.form.get('document')?.valueChanges.pipe(
      switchMap((value: InlineResponse20039 | null) => {
        this.hideDocumentType = false;
        return this.chatService.apiChatsGetTatSubjectsGet(value?.id, this.token).pipe(
          tap((response: InlineResponse20039[]) => this.tatSubjectOption = response),
        );
      }),
      takeUntil(this.destroy$),
    ).subscribe();
    this.form.get('documentType')?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.hideBlockWithCashAndEmployee = false;
    });
  }

  public onAddFileClick(): void {
    if (this.form.value.file) {
      this.filesMyHrService.apiUploadPost('smarti-dev', this.form.value.file[0] as File).pipe(
        takeUntil(this.destroy$),
      ).subscribe((response: InlineResponse20035) => {
        this.sendRequest.next(response.opswatId as string);
        this.observer.complete();
      });
    }
  }

  public fileUploaded(isUploaded: boolean): void {
    this.isDocumentUploaded = isUploaded;
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
