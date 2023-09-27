import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AllProductsGetResponseItems } from '@shared/api/models';
import { ProductsService } from '@shared/api/services';
import { TOKEN } from '@shared/entities';
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
  public token: string = this.localStorageService.getItem(TOKEN) as string;
  public isCustomDropdownActive: boolean = false;
  public allProducts$!: Observable<AllProductsGetResponseItems[] | null>;

  constructor(
    private readonly localStorageService: LocalStorageService,
    private readonly productsService: ProductsService,
  ) {
  }

  public ngOnInit(): void {
    this.allProducts$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.productsService.apiProductsAllProductsGet({
        token: this.token,
        limit: '1',
        page: '7',
      }),
    ]).pipe(
      debounceTime(500),
      map(([query, response]) => {
        return (response?.items as AllProductsGetResponseItems[]).filter(res =>
          (res.name as string).toLowerCase().indexOf(query?.toLowerCase() as string) > -1) ?? null;
      }),
    );
  }

  public onCustomDropdownClick(): void {
    this.isCustomDropdownActive = !this.isCustomDropdownActive;
  }
}
