import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { tuiIconSearchLarge } from '@taiga-ui/icons';
import { TuiInputInlineModule, TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-input-search',
  standalone: true,
  imports: [
    CommonModule, TuiInputModule, TuiTextfieldControllerModule, FormsModule,
    TuiInputInlineModule,
  ],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearchComponent {
  @Input() public search!: string;
  @Input() public customWidth!: string;
  @Input() public placeholder!: string;
  @Input() public customBorderBottom!: string;
  protected readonly tuiIconSearchLarge = tuiIconSearchLarge;
}
