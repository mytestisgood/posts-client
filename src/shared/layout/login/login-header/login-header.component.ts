import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'smarti-login-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginHeaderComponent {

  constructor(private readonly router: Router) {
  }
  public navigateToRegistrationPage(): void {
    this.router.navigate(['/registration'])
  }
}
