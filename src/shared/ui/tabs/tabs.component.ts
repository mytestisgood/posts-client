import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'smarti-tabs',
  standalone: true,
  imports: [CommonModule, TuiTabsModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  @Input() public activeItemIndex: number = 0;
  @Input() public firstButtonText!: string;
  @Input() public secondButtonText!: string;
  @Input() public thirdButtonText!: string;
  @Input() public fourthButtonText!: string;
  @Output()public activeItemIndexChange: EventEmitter<number> = new EventEmitter<number>();

  public onChangeIndex(index: number): void {
    this.activeItemIndexChange.next(index);
  }
}
