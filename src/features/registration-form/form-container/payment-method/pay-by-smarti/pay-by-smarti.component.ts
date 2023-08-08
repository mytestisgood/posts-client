import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent, InputFieldComponent, RadioComponent } from '@shared/ui';
import {
  Direction,
  PaymentMethodControls,
  PaymentMethodTabs,
} from '@shared/entities';

@Component({
  selector: 'smarti-pay-by-smarti',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    RadioComponent,
  ],
  templateUrl: './pay-by-smarti.component.html',
  styleUrls: ['./pay-by-smarti.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayBySmartiComponent {
  @Input() public paymentForm!: FormGroup<PaymentMethodControls>;
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

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

  public doChangeStep(forward: Direction): void {
    this.changeStep.emit(forward);
  }
}
