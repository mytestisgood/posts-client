import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiCheckboxModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-checkbox',
  standalone: true,
  imports: [CommonModule, TuiCheckboxModule, ReactiveFormsModule],
  templateUrl: './input-checkbox.component.html',
  styleUrls: ['./input-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputCheckboxComponent {
  @Input() public control: FormControl<boolean | null> = new FormControl<boolean | null>(null);
}
