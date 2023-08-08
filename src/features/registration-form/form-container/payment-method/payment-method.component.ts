import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  Direction,
  PaymentMethodControls,
  paymentMethodFormMapper,
  RegistrationFormValueType,
} from '@shared/entities';
import { DestroyService } from '@shared/services';
import { ButtonComponent, InputFieldComponent, RadioComponent, SelectComponent } from '@shared/ui';
import { takeUntil } from 'rxjs';
import { PayBySmartiComponent } from './pay-by-smarti/pay-by-smarti.component';
import { PayDirectlyComponent } from './pay-directly/pay-directly.component';

@Component({
  selector: 'smarti-payment-method',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectComponent,
    ButtonComponent,
    RadioComponent,
    InputFieldComponent,
    PayBySmartiComponent,
    PayDirectlyComponent,
  ],
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent implements OnInit {
  @Input() public startingForm!: FormGroup;
  @Input() public currentFormStateValue!: RegistrationFormValueType;
  @Output() public subformInitialized: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() public changeStep: EventEmitter<Direction> = new EventEmitter<Direction>();

  public paymentMethodInfoForm: FormGroup<PaymentMethodControls> = paymentMethodFormMapper();
  public payBySmartiOption: string = 'Pay by Smarti';
  public payDirectlyOption: string = 'Pay directly to insurance companies';
  public options: string[] = ['Pay directly to insurance companies'];
  public selectControl: FormControl<string | null> = new FormControl(this.payBySmartiOption);
  public isSelectedMode: boolean = true;
  public isPayBySmarti: boolean = true;

  constructor(private readonly destroy$: DestroyService) {
  }

  public ngOnInit(): void {
    if (this.startingForm) {
      this.paymentMethodInfoForm = this.startingForm;
    }
    this.subformInitialized.emit(this.paymentMethodInfoForm);
    this.onSelectChange();
  }

  public changeTemplate(): void {
    this.isSelectedMode = false;
    this.isPayBySmarti = this.selectControl.value === this.payBySmartiOption;
  }

  public doChangeStep(direction: Direction): void {
    this.subformInitialized.emit(this.paymentMethodInfoForm);
    this.changeStep.emit(direction);
  }

  public onSelectChange(): void {
    this.selectControl.valueChanges.pipe(
      takeUntil(this.destroy$),
    ).subscribe(() => {
      this.options[0] = this.selectControl.value === this.payBySmartiOption
        ? this.payDirectlyOption
        : this.payBySmartiOption;
    });
  }
}
