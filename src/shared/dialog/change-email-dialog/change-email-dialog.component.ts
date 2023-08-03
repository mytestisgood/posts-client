import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';
import { Subject } from 'rxjs';

@Component({
  selector: 'smarti-change-email-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './change-email-dialog.component.html',
  styleUrls: ['./change-email-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeEmailDialogComponent {
  @Input() public control: FormControl<string | null> = new FormControl<string>('');
  @Input() public observer!: { complete: () => void };
  @Output() public sendRequest: Subject<void> = new Subject();

  public sendChangeEmailRequest(): void {
    this.sendRequest.next();
    this.observer.complete();
  }

  public closeDialog(): void {
    this.observer.complete();
  }
}
