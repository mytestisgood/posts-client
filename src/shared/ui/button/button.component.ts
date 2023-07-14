import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() public typeClass!: 'confirm' | 'interaction' | 'dark';
  @Input() public disabled: boolean = false;
  @Input() public haveIcon: boolean = false;
  @Input() public text!: string;
  @Input() public iconName!: string;
  @Input() public customMargin!: string;
  @Input() public customWidth!: string;
  @Input() public textColor!: string;
  @Input() public customHeight!: string;
  @Input() public customBorder!: string;
  @Output() public buttonClicked: Subject<void> = new Subject();

  public clicked(): void {
    this.buttonClicked.next();
  }
}
