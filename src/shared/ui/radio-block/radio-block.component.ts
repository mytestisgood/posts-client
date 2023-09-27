import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-radio-block',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiRadioLabeledModule],
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
  @Input() public radioValue: FormControl<{ name: string } | null> = new FormControl();
  @Output() public chosenValue: Subject<string> = new Subject<string>();

  public changeValue(name: string): void {
    this.chosenValue.next(name);
  }
}
