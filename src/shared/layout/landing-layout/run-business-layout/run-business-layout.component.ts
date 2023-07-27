import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '@shared/ui';

@Component({
  selector: 'smarti-run-business-layout',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './run-business-layout.component.html',
  styleUrls: ['./run-business-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunBusinessLayoutComponent {
  constructor(private readonly router: Router) {
  }

  public navigateToRegistrationPage(): void {
    this.router.navigate(['/registration'])
  }
}
