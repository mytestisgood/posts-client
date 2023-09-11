import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InlineResponse2006, ProcessesService } from '@shared/api';
import { DEPARTMENT_ID, months, ProcessTableItems, REGISTRATION_TOKEN } from '@shared/entities';
import { DashboardProcessTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  InputYearComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-processes',
  standalone: true,
  imports: [
    CommonModule, InputYearComponent, SelectComponent, ButtonComponent,
    InputSearchComponent, DashboardProcessTableComponent, CustomDropdownComponent,
  ],
  templateUrl: './dashboard-processes.component.html',
  styleUrls: ['./dashboard-processes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardProcessesComponent {
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public departmentId: string = this.localStorageService.getItem(DEPARTMENT_ID) as string;
  public isCustomDropdownActive: boolean = false;
  public dashboardProcessItems$: Observable<ProcessTableItems[] | null> =
    this.processesService.apiProcessesGet().pipe(
      map((response: InlineResponse2006) => {
        if (response?.items?.length) {
          return response.items.map(item => ({ ...item, isSelected: false }));
        }
        return null;
      }),
    );
  protected readonly months: string[] = months;

  constructor(
    private readonly processesService: ProcessesService,
    private readonly localStorageService: LocalStorageService,
  ) {}

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
