import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaymentMethodControls, PaymentMethodTabs, RegistrationDirection } from '@shared/entities';
import { ButtonComponent, InputFieldComponent, RadioBlockComponent } from '@shared/ui';

@Component({
  selector: 'smarti-pay-by-smarti',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    RadioBlockComponent,
  ],
  templateUrl: './pay-by-smarti.component.html',
  styleUrls: ['./pay-by-smarti.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayBySmartiComponent {
  @Input() public paymentForm!: FormGroup<PaymentMethodControls>;
  @Output() public changeStep: EventEmitter<RegistrationDirection> = new EventEmitter<RegistrationDirection>();

  public institutionalNumber: string = 'Institutional number';
  public bankTransfer: string = 'Bank Transfer';
  public radioItems: { name: string }[] = [
    { name: this.institutionalNumber },
    { name: this.bankTransfer },
  ];
  public radioValue: FormControl<{ name: string } | null> = new FormControl(this.radioItems[1]);
  public activeTabIndex: PaymentMethodTabs = PaymentMethodTabs.Bank;
  public paymentMethodTabs = PaymentMethodTabs;
  public isBankTransfer: boolean = true;

  public doChangeContent(name: string): void {
    if (name === this.institutionalNumber) {
      this.activeTabIndex = PaymentMethodTabs.InstitutionalNumber;
      this.isBankTransfer = false;
    } else {
      this.activeTabIndex = PaymentMethodTabs.Bank;
      this.isBankTransfer = true;
    }
  }

  public doChangeStep(forward: RegistrationDirection): void {
    this.changeStep.emit(forward);
  }
}
