import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { createObjectHttpParams } from '../../helpers/http.helper';
import {
  AllProductsGetParameters,
  AllProductsGetResponse,
  CompensationsEmployeeIdCompanyParameters,
  ProductsByCompanyGetParameters,
  ProductsCompaniesGetResponse,
  ProductsFullCompanyGetResponse,
  TokenParameters,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {
  }

  public apiProductsAllProductsGet(data: AllProductsGetParameters): Observable<AllProductsGetResponse> {
    return this.http.get<AllProductsGetResponse>(`${environment.authUrl}/api/products/allProducts/`, { params: createObjectHttpParams(data) });
  }

  public apiProductsCompaniesGet(data: TokenParameters): Observable<ProductsCompaniesGetResponse> {
    return this.http.get<ProductsCompaniesGetResponse>(`${environment.authUrl}/api/products/companies/`, { params: createObjectHttpParams(data) });
  }

  public apiProductsFullCompanyGet(data: TokenParameters): Observable<ProductsFullCompanyGetResponse> {
    return this.http.get<ProductsFullCompanyGetResponse>(`${environment.authUrl}/api/products/fullCompany/`, { params: createObjectHttpParams(data) });
  }

  public apiProductsProductByCompanyGet(data: ProductsByCompanyGetParameters): Observable<Array<string>> {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/products/productByCompany/`, { params: createObjectHttpParams(data) });
  }

  public apiCompensationsEmployeeIdCompanyEmployeeGet(data: CompensationsEmployeeIdCompanyParameters) {
    return this.http.get<Array<string>>(`${environment.authUrl}/api/compensations/${data.employeeId}/companyEmployee/`, { params: createObjectHttpParams(data) });
  }
}