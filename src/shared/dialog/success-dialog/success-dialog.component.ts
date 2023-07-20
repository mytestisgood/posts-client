import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-success-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessDialogComponent {
  @Input() public observer!: { complete: () => void };
  @Input() public headerText!: string;
  @Input() public descriptionText!: string;
  @Input() public buttonText!: string;
  @Input() public redirectLink: string = '/';
  constructor(private router: Router) {
  }
  public redirectToPage(): void {
    this.observer.complete();
    this.router.navigate([this.redirectLink]);
  }
}
