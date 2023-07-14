import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  public checkboxForm = new FormGroup({
    value: new FormControl(false)
  })
}
