import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetOrganizationsResponse } from '@shared/api/models';
import { OrganizationsService } from '@shared/api/services';
import { CustomGroupSelectDashboardHeaderComponent, CustomUserMenuComponent } from '@shared/ui';
import { Observable } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-header',
  standalone: true,
  imports: [CommonModule, CustomUserMenuComponent, CustomGroupSelectDashboardHeaderComponent],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  public getOrganizations$: Observable<GetOrganizationsResponse[]> =
    this.organizationsService.apiOrganizationsGetOrganizationsGet();
  constructor(
    private readonly router: Router,
    private readonly organizationsService: OrganizationsService,
  ) {}

  public redirectToMainPage(): void {
    this.router.navigate(['/']);
  }
}
