import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineResponse20028, InlineResponse20028Items, ProductsService } from '@shared/api';
import { REGISTRATION_TOKEN } from '@shared/entities';
import { DashboardCashRegisterTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-cash-register',
  standalone: true,
  imports: [
    CommonModule, ButtonComponent, CustomDropdownComponent, InputSearchComponent,
    SelectComponent, DashboardCashRegisterTableComponent,
  ],
  templateUrl: './dashboard-cash-register.component.html',
  styleUrls: ['./dashboard-cash-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterComponent {
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public allProducts$: Observable<InlineResponse20028Items[] | null> = this.productsService.apiProductsAllProductsGet(
    '1',
    '7',
    this.token,
  ).pipe(map((response: InlineResponse20028) => response.items ?? null));

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly productsService: ProductsService,
  ) {}

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
