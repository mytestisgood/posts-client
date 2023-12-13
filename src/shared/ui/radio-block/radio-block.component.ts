import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiHintModule } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';
import {InputNumberComponent} from "../input-number/input-number.component";

@Component({
  selector: 'smarti-radio-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiRadioLabeledModule, TuiHintModule, InputNumberComponent],
  templateUrl: './radio-block.component.html',
  styleUrls: ['./radio-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioBlockComponent {
  @Input() public labelFirstText!: string;
  @Input() public labelSecondText!: string;
  @Input() public items!: { name: string }[];
  @Input() public isHorizontal: boolean = false;
  @Input() public customClass!: 'big';
  @Input() public hasTooltipInfoFirstIcon: boolean = false;
  @Input() public infoTooltipFirstText!: TemplateRef<HTMLElement>;
  @Input() public hasTooltipInfoSecondIcon: boolean = false;
  @Input() public infoTooltipSecondText!: TemplateRef<HTMLElement>;
  @Input() public radioValue: FormControl<{ name: string } | null> = new FormControl();
  @Output() public chosenValue: Subject<string> = new Subject<string>();

  public changeValue(name: string): void {
    this.chosenValue.next(name);
  }
}
