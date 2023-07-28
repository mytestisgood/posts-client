import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input, OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  ForwardRequestDialogComponent,
} from '@shared/dialog';
import {
  ButtonComponent,
  DatePickerComponent,
  InputFileComponent,
  NotificationComponent,
  SelectComponent,
} from '@shared/ui';
import { DestroyService } from '@shared/services';
import { takeUntil } from 'rxjs';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-upload-document',
  standalone: true,
  imports: [
    CommonModule,
    DatePickerComponent,
    SelectComponent,
    InputFileComponent,
    ForwardRequestDialogComponent,
    NotificationComponent,
    ButtonComponent,
  ],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
  public personalInfoForm!: FormGroup;
  public documentUploaded: boolean = false;
  public isSendRequest: boolean = false;

  public monthsSelect: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  public isNotificationClosed: boolean = false;

  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private readonly fb: FormBuilder,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly destroy$: DestroyService,
  ) {
  }

  public ngOnInit(): void {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    } else {
      this.personalInfoForm = this.fb.group({
        firstName: '',
        lastName: '',
      });
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }

  public doChangeStep(direction: 'forward'): void {
    this.changeStep.emit(direction);
  }

  public downloadXlExample(): void {
    const link = document.createElement('a');

    link.setAttribute('type', 'hidden');
    link.href = '/assets/files/דוגמה.xlsx';
    link.download = 'דוגמה.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  public openForwardModal(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      closeable: false,
    }).pipe(takeUntil(this.destroy$)).subscribe();
  }

  public fileUploaded(isUploaded: boolean): void {
    this.documentUploaded = isUploaded;
  }

  public requestSend(isSend: boolean): void {
    this.isSendRequest = isSend;
    this.changeDetectionRef.detectChanges();
  }

  public closeNotification(isClosed: boolean): void {
    this.isNotificationClosed = isClosed;
  }
}
