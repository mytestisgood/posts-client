import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { RegistrationDirection } from '@shared/entities';
import { downloadFileHelper } from '@shared/helpers';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-pay-directly',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pay-directly.component.html',
  styleUrls: ['./pay-directly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayDirectlyComponent {
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();
  public isFirstStep: boolean = true;
  public isFileUploaded: boolean = false;

  public downloadPaymentExample(): void {
    downloadFileHelper('/assets/files/דוגמה.xlsx', 'דוגמה.xlsx');
  }

  public uploadPaymentExample(): void {
    this.isFileUploaded = true;
  }

  public continueStep(step: string): void {
    if (step === 'first') {
      this.isFirstStep = false;
    }
    if (step === 'second') {
      this.changeStep.emit('forward');
    }
  }
}
