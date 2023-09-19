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
import { ConnectType } from './connectType';
import { Roles } from './roles';


export interface InlineResponse2002User { 
    id?: number;
    identifier?: string;
    role?: Roles;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    organization_group_id?: number;
    is_registered?: boolean;
    name?: string;
    connect_type?: ConnectType;
    is_skip?: boolean;
    is_active?: boolean;
}
export namespace InlineResponse2002User {
}

