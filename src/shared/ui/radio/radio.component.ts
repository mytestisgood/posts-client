import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiRadioLabeledModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
  @Input() public labelFirstText!: string;
  @Input() public labelSecondText!: string;
  @Input() public items!: { name: string }[];
  @Input() public isHorizontal: boolean = false;
  @Input() public customClass!: 'big';
  @Input() public radioValue: FormControl<{ name: string } | null> = new FormControl();
  @Output() public chosenValue: Subject<string> = new Subject<string>();

  public changeValue(name: string): void {
    this.chosenValue.next(name);
  }
}
