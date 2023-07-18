import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'smarti-registration-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registration-header.component.html',
  styleUrls: ['./registration-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationHeaderComponent {
  constructor(private readonly router: Router) {
  }
  public navigateToLoginPage(): void {
    this.router.navigate(['/login'])
  }
}
