import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InlineResponse20028Items, ProductsService } from '@shared/api';
import { REGISTRATION_TOKEN } from '@shared/entities';
import { DashboardCashRegisterTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  SelectComponent,
} from '@shared/ui';
import { LocalStorageService } from '@shared/web-api';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

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
export class DashboardCashRegisterComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public token: string = this.localStorageService.getItem(REGISTRATION_TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public allProducts$!: Observable<InlineResponse20028Items[] | null>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly productsService: ProductsService,
  ) {
  }

  public ngOnInit(): void {
    this.allProducts$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.productsService.apiProductsAllProductsGet('1', '7', this.token),
    ]).pipe(
      debounceTime(500),
      map(([query, response]) => {
        return (response?.items as InlineResponse20028Items[]).filter(res =>
          (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1) ?? null;
      }),
    );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
