import {
  ChangeDetectionStrategy,
  Component, Input, TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiDropdownModule } from '@taiga-ui/core';

@Component({
  selector: 'smarti-custom-dropdown',
  standalone: true,
  imports: [CommonModule, TuiDropdownModule, TuiActiveZoneModule, TuiObscuredModule],
  templateUrl: './custom-dropdown.component.html',
  styleUrls: ['./custom-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDropdownComponent {
  @Input() public customContent!: TemplateRef<Element>;
  public open:boolean = false;

  public onClick(): void {
    this.open = !this.open;
  }

  public onObscured(obscured: boolean): void {
    if (obscured) {
      this.open = false;
    }
  }

  public onActiveZone(active: boolean): void {
    this.open = active && this.open;
  }
}
