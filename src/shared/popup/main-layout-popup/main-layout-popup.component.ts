import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-main-layout-popup',
  templateUrl: './main-layout-popup.component.html',
  styleUrls: ['./main-layout-popup.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutPopupComponent {
  @Input() public direction: 'left' | 'right' = 'left';

  public isRightPopupActive: boolean = true;
  public isLeftPopupActive: boolean = true;

  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate(['/registration']);
  }

  public closePopup(direction: string): void {
    switch (direction) {
      case 'left':
        this.isLeftPopupActive = false;
        this.changeDetectorRef.detectChanges();
        break;
      case 'right':
        this.isRightPopupActive = false;
        this.changeDetectorRef.detectChanges();
        break;
    }
  }
}
