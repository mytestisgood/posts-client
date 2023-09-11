import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CompensationsService, InlineResponse2006 } from '@shared/api';
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
import { map, Observable } from 'rxjs';

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
export class DashboardCompensationsComponent {
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public compensations$: Observable<CompensationsListItems[] | null> = this.compensationsService.apiCompensationsGet(
    '',
    '',
    '',
    '9301',
    '1',
    '7',
    this.token,
  ).pipe(
    map((response: InlineResponse2006) => {
      if (response?.items?.length) {
        return response.items.map(item => ({ ...item, isSelected: false }));
      }
      return null;
    }),
  );

  constructor(
    private readonly compensationsService: CompensationsService,
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
