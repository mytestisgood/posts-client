import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20050, InlineResponse20050Items, MenoraService } from '@shared/api';
import { REGISTRATION_TOKEN } from '@shared/entities';
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
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public menoraItems$: Observable<InlineResponse20050Items[] | null> = this.menoraService.apiMenoraGet(
    '',
    '',
    '',
    '',
    '',
    this.token,
  ).pipe(map((response: InlineResponse20050) => response.items ?? null));
  constructor(
    private readonly menoraService: MenoraService,
    private readonly localStorageService: LocalStorageService,
  ) {}
}
