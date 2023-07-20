import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiRadioLabeledModule } from '@taiga-ui/kit';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-radio',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiRadioLabeledModule],
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent {
  @Input() public labelFirstText: any;
  @Input() public labelSecondText: any;
  @Input() public items!: {name: string}[];
  @Output() public chosenValue: Subject<string> = new Subject<string>();

  public radioForm = new FormGroup({
    radioValue: new FormControl(),
  });

  public changeValue(name: string): void {
    this.chosenValue.next(name)
  }
}
