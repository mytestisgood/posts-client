/**
 * Smarti
 * Smarti1
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: dinav@smarti-saas.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ApicompensationsProductsCompany } from './apicompensationsProductsCompany';
import { EventCode } from './eventCode';
import { ProductType } from './productType';


export interface ApiCompensationsBody { 
    comments?: string;
    company0?: string;
    department_id?: string;
    employee?: number;
    employer_id?: number;
    event_code?: EventCode;
    has_all?: boolean;
    product_type0?: ProductType;
    products_company?: Array<ApicompensationsProductsCompany>;
    projected_balance?: number;
    validity_date?: string;
}
export namespace ApiCompensationsBody {
}


