import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenoraGetResponse, MenoraGetResponseItems } from '@shared/api/models';
import { MenoraService } from '@shared/api/services';
import { DashboardHeaderIds, TOKEN } from '@shared/entities';
import { DataSharingService } from '@shared/services';
import { DashboardShieldTableComponent } from '@shared/tables';
import { ButtonComponent, LoaderComponent } from '@shared/ui';
import { SessionStorageService } from '@shared/web-api';
import { filter, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-shield',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DashboardShieldTableComponent, LoaderComponent],
  templateUrl: './dashboard-shield.component.html',
  styleUrls: ['./dashboard-shield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardShieldComponent implements OnInit {
  public token: string = this.sessionStorageService.getItem(TOKEN) as string;
  public menoraItems$!: Observable<MenoraGetResponseItems[] | null>;

  constructor(
    private readonly menoraService: MenoraService,
    private readonly sessionStorageService: SessionStorageService,
    private readonly dataSharingService: DataSharingService,
  ) {}

  public ngOnInit(): void {
    this.menoraItems$ = this.dataSharingService.dashboardHeaderIds.pipe(
      filter(value => !!value.organizationId),
      switchMap((value: DashboardHeaderIds) => {
        return this.menoraService.apiMenoraGet({
          limit: '4',
          page: '1',
          organizationId: value.organizationId as string,
          employerId: value.employerId as string,
          departmentId: value.departmentId as string,
        }).pipe(map((response: MenoraGetResponse) => response.items ?? null));
      }),
    );
  }
}
