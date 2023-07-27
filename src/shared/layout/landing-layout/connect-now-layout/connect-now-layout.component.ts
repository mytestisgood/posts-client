import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-connect-now-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './connect-now-layout.component.html',
  styleUrls: ['./connect-now-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectNowLayoutComponent {
  constructor(private readonly router: Router) {
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate(['/registration'])
  }
}
