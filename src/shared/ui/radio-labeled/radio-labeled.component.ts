import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiSizeL } from '@taiga-ui/core';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-radio-labeled',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiRadioLabeledModule],
  templateUrl: './radio-labeled.component.html',
  styleUrls: ['./radio-labeled.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioLabeledComponent {
  @Input() public control: FormControl<string | null> = new FormControl();
  @Input() public item!: string;
  @Input() public size!: TuiSizeL;
  @Input() public label!: string;
  @Input() public labelCustomClass!: string;
  @Output() public chosenValue: Subject<string> = new Subject<string>();

  public changeValue(name: string): void {
    this.chosenValue.next(name);
  }
}
