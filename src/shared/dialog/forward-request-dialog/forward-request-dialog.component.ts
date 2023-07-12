import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { InputFieldComponent } from '../../ui/input-field/input-field.component';

@Component({
  selector: 'smarti-forward-request-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent],
  templateUrl: './forward-request-dialog.component.html',
  styleUrls: ['./forward-request-dialog.component.scss']
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
