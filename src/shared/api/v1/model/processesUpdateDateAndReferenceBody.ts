/**
 * Smarti
 * Smarti1
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: dinav@smarti-saas.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { CriteriaUpdateProcess } from './criteriaUpdateProcess';


export interface ProcessesUpdateDateAndReferenceBody { 
    file_id?: Array<string>;
    type?: boolean;
    criteria?: CriteriaUpdateProcess;
    opswatIds?: Array<string>;
    deposit_date?: string;
}

