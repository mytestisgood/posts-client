import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenoraGetResponse, MenoraGetResponseItems } from '@shared/api/models';
import { MenoraService } from '@shared/api/services';
import { TOKEN } from '@shared/entities';
import { DashboardShieldTableComponent } from '@shared/tables';
import { ButtonComponent } from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-shield',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DashboardShieldTableComponent],
  templateUrl: './dashboard-shield.component.html',
  styleUrls: ['./dashboard-shield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldComponent {
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public menoraItems$: Observable<MenoraGetResponseItems[] | null> = this.menoraService.apiMenoraGet({
    token: this.token,
  }).pipe(map((response: MenoraGetResponse) => response.items ?? null));
  constructor(
    private readonly menoraService: MenoraService,
    private readonly localStorageService: LocalStorageService,
  ) {}
}
