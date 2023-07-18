import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-registration-success-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './registration-success-dialog.component.html',
  styleUrls: ['./registration-success-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationSuccessDialogComponent {
  @Input() public observer!: { complete: () => void };
  constructor(private router: Router) {
  }
  public redirectToMainPage(): void {
    this.observer.complete();
    this.router.navigate(['/']);
  }
}
