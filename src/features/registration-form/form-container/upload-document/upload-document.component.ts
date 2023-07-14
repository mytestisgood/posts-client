import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import {
  ForwardRequestDialogComponent
} from '../../../../shared/dialog/forward-request-dialog/forward-request-dialog.component';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { DatePickerComponent } from '../../../../shared/ui/date-picker/date-picker.component';
import { InputFileComponent } from '../../../../shared/ui/input-file/input-file.component';
import { NotificationComponent } from '../../../../shared/ui/notification/notification.component';
import { SelectComponent } from '../../../../shared/ui/select/select.component';

type Direction = 'forward' | 'back';

@Component({
  selector: 'smarti-upload-document',
  standalone: true,
  imports: [
    CommonModule, DatePickerComponent, SelectComponent, InputFileComponent,
    ForwardRequestDialogComponent, NotificationComponent, ButtonComponent,
  ],
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDocumentComponent {
  @Input() startingForm!: FormGroup;
  @Output() subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();
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
  ]
  public isNotificationClosed: boolean = false;
  constructor(
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private _fb: FormBuilder,
    private changeDetectionRef: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    if (this.startingForm) {
      this.personalInfoForm = this.startingForm;
    } else {
      this.personalInfoForm = this._fb.group({
        firstName: '',
        lastName: '',
        // ... continue with the other fields
      })
    }
    this.subformInitialized.emit(this.personalInfoForm);
  }
  doChangeStep(direction: 'forward') {
    this.changeStep.emit(direction);
  }

  public downloadXlExample(): void {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.href = '../../../../assets/files/דוגמה.xlsx';
    link.download = 'דוגמה.xlsx';
    document.body.appendChild(link);
    link.click();
    link.remove()
  }

  public openForwardModal(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content).subscribe();
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
