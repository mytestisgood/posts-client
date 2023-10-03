import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AllProductsGetResponseItems } from '@shared/api/models';
import { ProductsService } from '@shared/api/services';
import { DashboardCashRegisterTableComponent } from '@shared/tables';
import {
  ButtonComponent,
  CustomDropdownComponent,
  InputSearchComponent,
  LoaderComponent,
  SelectComponent,
} from '@shared/ui';
import { combineLatest, debounceTime, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'smarti-dashboard-cash-register',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    CustomDropdownComponent,
    InputSearchComponent,
    SelectComponent,
    DashboardCashRegisterTableComponent,
    LoaderComponent,
  ],
  templateUrl: './dashboard-cash-register.component.html',
  styleUrls: ['./dashboard-cash-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCashRegisterComponent implements OnInit {
  public controlSearch: FormControl<string | null> = new FormControl<string>('');
  public isCustomDropdownActive: boolean = false;
  public allProducts$!: Observable<AllProductsGetResponseItems[] | null>;

  constructor(private readonly productsService: ProductsService) {
  }

  public ngOnInit(): void {
    this.allProducts$ = combineLatest([
      this.controlSearch.valueChanges.pipe(startWith('')),
      this.productsService.apiProductsAllProductsGet({
        limit: '100',
        page: '1',
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
