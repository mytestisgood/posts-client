import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output, TemplateRef } from '@angular/core';
import { TuiActiveZoneModule, TuiObscuredModule } from '@taiga-ui/cdk';
import { TuiDropdownModule } from '@taiga-ui/core';
import { Subject } from 'rxjs';

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
  @Output() public clickEvent: Subject<void> = new Subject();
  public open: boolean = false;

  public onClick(): void {
    this.open = !this.open;
    this.clickEvent.next();
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
