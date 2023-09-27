import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioBlockModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-radio-block-payment',
  standalone: true,
  imports: [CommonModule, TuiRadioBlockModule, ReactiveFormsModule],
  templateUrl: './radio-block-payment.component.html',
  styleUrls: ['./radio-block-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioBlockPaymentComponent implements OnInit {
  @Input() public firstRadioBlockTemplate!: TemplateRef<Element>;
  @Input() public secondRadioBlockTemplate!: TemplateRef<Element>;
  @Input() public thirdRadioBlockTemplate!: TemplateRef<Element>;

  public readonly radioBlocksForm = new FormGroup({
    radioBlockValue: new FormControl('first'),
  });
  public radioItemsValue: string[] = ['first', 'second', 'third'];

  public ngOnInit(): void {
    this.radioBlocksForm.valueChanges.pipe().subscribe(value => {
      this.changeBorderStyleBlock(value.radioBlockValue as string);
    });
  }

  public changeBorderStyleBlock(value: string): void {
    this.radioItemsValue.forEach(radioItem => {
      document.getElementById(value + '-tui-radio-labeled-block-block')?.
      classList.add('border-bright-turquoise-500');
      if (radioItem !== value) {
        document.getElementById(radioItem + '-tui-radio-labeled-block-block')?.
        classList.remove('border-bright-turquoise-500');
      }
    });
  }
}
