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
  @Input() public typeClass!: 'confirm' | 'interaction' | 'dark' | 'white' | 'rose' | 'blue';
  @Input() public text!: string;
  @Input() public iconName!: string;
  @Input() public customMargin!: string;
  @Input() public customWidth!: string;
  @Input() public textColor!: string;
  @Input() public customHeight!: string;
  @Input() public customBorder!: string;
  @Input() public customBorderRadius!: string;
  @Input() public customButtonWidth!: string;
  @Input() public disabled: boolean = false;
  @Input() public paragraphTextExtra: boolean = false;
  @Input() public buttonTextSmall: boolean = false;
  @Input() public hasFileIconRight: boolean = false;
  @Input() public hasFileIconLeft: boolean = false;
  @Input() public hasEditIcon: boolean = false;
  @Input() public hasAddIcon: boolean = false;
  @Input() public hasArrowDownIconFromLeft: boolean = false;
  @Input() public hasMessageIcon: boolean = false;
  @Input() public hasSaveIcon: boolean = false;
  @Input() public isNeedZIndex: boolean = false;
  @Input() public hasFromRightArrowLeftIcon: boolean = false;
  @Output() public buttonClicked: Subject<void> = new Subject();

  public clicked(): void {
    this.buttonClicked.next();
  }
}
