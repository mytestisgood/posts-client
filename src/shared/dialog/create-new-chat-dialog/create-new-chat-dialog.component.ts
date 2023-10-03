import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IdAndNameResponse, UploadPostResponse } from '@shared/api/models';
import { ChatService, FilesMyHrService } from '@shared/api/services';
import { DashboardCreateNewChatGroupControls, FileUploadStatusAndId } from '@shared/entities';
import { fileFromBlotToTextFormatHelper } from '@shared/helpers';
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
  @Input() public observer!: { complete: () => void };
  @Output() public sendRequest: Subject<string> = new Subject();

  public isDocumentUploaded: boolean = false;
  public hideDocumentType: boolean = true;
  public hideBlockWithCashAndEmployee: boolean = true;
  public chatSubject$: Observable<IdAndNameResponse[]> = this.chatService.apiChatsGetChatSubjectsGet();
  public chatSubjectOption!: IdAndNameResponse[];
  public tatSubjectOption!: IdAndNameResponse[];

  constructor(
    private readonly destroy$: DestroyService,
    private readonly chatService: ChatService,
    private readonly filesMyHrService: FilesMyHrService,
  ) {
  }

  public ngOnInit(): void {
    this.chatSubject$.subscribe((response: IdAndNameResponse[]) => this.chatSubjectOption = response);
    this.form.get('document')?.valueChanges.pipe(
      switchMap((value: IdAndNameResponse | null) => {
        this.hideDocumentType = false;

        return this.chatService.apiChatsGetTatSubjectsGet({
          subjectId: value?.id,
        }).pipe(
          tap((response: IdAndNameResponse[]) => this.tatSubjectOption = response),
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
      fileFromBlotToTextFormatHelper(this.form.value.file[0] as File).pipe(
        switchMap((value: string) => this.filesMyHrService.apiUploadPost({ file: value })),
        takeUntil(this.destroy$),
      ).subscribe((response: UploadPostResponse) => {
        this.sendRequest.next(response.opswatId as string);
        this.observer.complete();
      });
    }
  }

  public fileUploaded(uploaded: FileUploadStatusAndId): void {
    this.isDocumentUploaded = uploaded.status;
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
