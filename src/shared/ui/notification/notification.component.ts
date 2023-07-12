import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'smarti-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent {
  @Input() public header!: string;
  @Input() public description!: string;
  @Input() public width: string = '812px'
  @Input() public height: string = '120px'
  @Output() public closeNotification: BehaviorSubject<boolean> = new BehaviorSubject(false);


  public onCloseNotification(): void {
    this.closeNotification.next(true);
  }
}
