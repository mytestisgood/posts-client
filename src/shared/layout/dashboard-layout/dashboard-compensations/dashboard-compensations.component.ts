import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompensationsService } from '@shared/api';
import { CompensationsListItems, REGISTRATION_TOKEN } from '@shared/entities';
import { DashboardCompensationsTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputDateComponent,
  InputSearchComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-compensations',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    SelectComponent, InputDateComponent, DashboardCompensationsTableComponent,
  ],
  templateUrl: './dashboard-compensations.component.html',
  styleUrls: ['./dashboard-compensations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCompensationsComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public compensations$!: Observable<CompensationsListItems[] | null>;

  constructor(
    private readonly compensationsService: CompensationsService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public ngOnInit(): void {
    this.compensations$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.compensationsService.apiCompensationsGet('', '', '', '9301', '1', '7', this.token),
    ]).pipe(
      debounceTime(500),
      map(([query, response]) => {
        const compensationsListItems: CompensationsListItems[] | null = (response.items as CompensationsListItems[])
          .map(item => ({ ...item, isSelected: false }));

        return compensationsListItems.filter(res =>
          (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1);
      }),
    );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}