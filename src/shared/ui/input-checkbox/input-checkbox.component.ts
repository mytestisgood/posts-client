import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() public control: FormControl<boolean | null> = new FormControl<boolean | null>(false);
  @Output() public changeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public change(event: Event): void {
    this.changeEvent.emit((event.target as HTMLInputElement).checked);
  }
}
