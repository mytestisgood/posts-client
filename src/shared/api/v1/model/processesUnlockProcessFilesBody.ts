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
import { ApiprocessesunlockProcessFilesCriteria } from './apiprocessesunlockProcessFilesCriteria';


export interface ProcessesUnlockProcessFilesBody { 
    filesList?: Array<number>;
    is_unlock?: boolean;
    comment?: string;
    criteria?: ApiprocessesunlockProcessFilesCriteria;
    processId?: number;
}

