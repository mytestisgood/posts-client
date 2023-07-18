import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';

@Component({
  selector: 'smarti-forward-request-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './forward-request-dialog.component.html',
  styleUrls: ['./forward-request-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForwardRequestDialogComponent {
  @Input() public haveCloseIcon: boolean = false;
  @Input() public observer!: { complete: () => void };
  @Output() public requestSend: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(): void {
    this.observer.complete();
    this.requestSend.next(true);
  }
}
