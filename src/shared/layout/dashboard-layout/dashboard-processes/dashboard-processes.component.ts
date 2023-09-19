import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InlineResponse2007Items, ProcessesService } from '@shared/api';
import { DEPARTMENT_ID, months, ProcessTableItems, TOKEN } from '@shared/entities';
import { DashboardProcessTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  InputYearComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

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
export class DashboardProcessesComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public departmentId: string = this.localStorageService.getItem(DEPARTMENT_ID) as string;
  public isCustomDropdownActive: boolean = false;
  public dashboardProcessItems$!: Observable<ProcessTableItems[] | null>;
  protected readonly months: string[] = months;

  constructor(
    private readonly processesService: ProcessesService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    this.dashboardProcessItems$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.processesService.apiProcessesGet(),
    ]).pipe(
      debounceTime(500),
      map(([query, response]) => {
        const processTableItems: ProcessTableItems[] | null = (response.items as InlineResponse2007Items[])
          .map(item => ({ ...item, isSelected: false })) ?? null;

        return processTableItems.filter(res =>
          (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1);
      }),
    );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
