import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20051, InlineResponse20051Items, MenoraService } from '@shared/api';
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
  public menoraItems$: Observable<InlineResponse20051Items[] | null> = this.menoraService.apiMenoraGet(
    '',
    '',
    '',
    '',
    '',
    this.token,
  ).pipe(map((response: InlineResponse20051) => response.items ?? null));
  constructor(
    private readonly menoraService: MenoraService,
    private readonly localStorageService: LocalStorageService,
  ) {}
}
