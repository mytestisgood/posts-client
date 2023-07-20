import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputFieldComponent } from '@shared/ui';

@Component({
  selector: 'smarti-leads-dialog',
  standalone: true,
  imports: [CommonModule, InputFieldComponent, ButtonComponent],
  templateUrl: './leads-dialog.component.html',
  styleUrls: ['./leads-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsDialogComponent {
  @Input() public observer!: { complete: () => void };
  @Input() public haveCloseIcon: boolean = false;
  @Input() public headerFormText!: string;
  @Input() public descriptionFormText!: string;
  @Input() public headerText!: string;
  @Input() public descriptionText!: string;
  @Input() public backgroundImage!: string;

  public closeDialog(): void {
    this.observer.complete();
  }

  public sendRequest(): void {
    this.observer.complete();
  }
}
