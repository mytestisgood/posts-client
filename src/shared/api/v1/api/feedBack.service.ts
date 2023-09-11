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
/* tslint:disable:no-unused-variable member-ordering */

import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHeaders,
  HttpParameterCodec,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import { CustomHttpParameterCodec } from '../encoder';

// @ts-ignore
import { FeedbacksChangeStatusBody } from '../model/feedbacksChangeStatusBody';
// @ts-ignore
import { FeedbacksFeedbackBody } from '../model/feedbacksFeedbackBody';
// @ts-ignore
import { InlineResponse200 } from '../model/inlineResponse200';
// @ts-ignore
import { InlineResponse20039 } from '../model/inlineResponse20039';
// @ts-ignore
import { InlineResponse20040 } from '../model/inlineResponse20040';
// @ts-ignore
import { InlineResponse20041 } from '../model/inlineResponse20041';
// @ts-ignore
import { InlineResponse20042 } from '../model/inlineResponse20042';
// @ts-ignore
import { InlineResponse20043 } from '../model/inlineResponse20043';
// @ts-ignore
import { StatusFileFeedback } from '../model/statusFileFeedback';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';


@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

    protected basePath = 'https://virtserver.swaggerhub.com/smarti/smarti/1.0.1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * feedBack change status
     * @param token 
     * @param feedbacksChangeStatusBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeedbacksChangeStatusPost(token?: string, feedbacksChangeStatusBody?: FeedbacksChangeStatusBody, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InlineResponse20041>;
    public apiFeedbacksChangeStatusPost(token?: string, feedbacksChangeStatusBody?: FeedbacksChangeStatusBody, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InlineResponse20041>>;
    public apiFeedbacksChangeStatusPost(token?: string, feedbacksChangeStatusBody?: FeedbacksChangeStatusBody, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InlineResponse20041>>;
    public apiFeedbacksChangeStatusPost(token?: string, feedbacksChangeStatusBody?: FeedbacksChangeStatusBody, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;
        if (token !== undefined && token !== null) {
            localVarHeaders = localVarHeaders.set('Token', String(token));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/feedbacks/changeStatus`;
        return this.httpClient.request<InlineResponse20041>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: feedbacksChangeStatusBody,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * feedBack
     * @param token 
     * @param feedbacksFeedbackBody 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeedbacksFeedbackPost(token?: string, feedbacksFeedbackBody?: FeedbacksFeedbackBody, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InlineResponse20040>;
    public apiFeedbacksFeedbackPost(token?: string, feedbacksFeedbackBody?: FeedbacksFeedbackBody, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InlineResponse20040>>;
    public apiFeedbacksFeedbackPost(token?: string, feedbacksFeedbackBody?: FeedbacksFeedbackBody, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InlineResponse20040>>;
    public apiFeedbacksFeedbackPost(token?: string, feedbacksFeedbackBody?: FeedbacksFeedbackBody, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;
        if (token !== undefined && token !== null) {
            localVarHeaders = localVarHeaders.set('Token', String(token));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/feedbacks/feedback`;
        return this.httpClient.request<InlineResponse20040>('post', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: feedbacksFeedbackBody,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get details feedBack
     * @param mtbId 
     * @param sentGroupId 
     * @param statusSentGroup 
     * @param departmentId 
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeedbacksGetTransferGet(mtbId?: string, sentGroupId?: StatusFileFeedback, statusSentGroup?: string, departmentId?: string, token?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InlineResponse20043>;
    public apiFeedbacksGetTransferGet(mtbId?: string, sentGroupId?: StatusFileFeedback, statusSentGroup?: string, departmentId?: string, token?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InlineResponse20043>>;
    public apiFeedbacksGetTransferGet(mtbId?: string, sentGroupId?: StatusFileFeedback, statusSentGroup?: string, departmentId?: string, token?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InlineResponse20043>>;
    public apiFeedbacksGetTransferGet(mtbId?: string, sentGroupId?: StatusFileFeedback, statusSentGroup?: string, departmentId?: string, token?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (mtbId !== undefined && mtbId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>mtbId, 'mtbId');
        }
        if (sentGroupId !== undefined && sentGroupId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>sentGroupId, 'sentGroupId');
        }
        if (statusSentGroup !== undefined && statusSentGroup !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>statusSentGroup, 'status_sent_group');
        }
        if (departmentId !== undefined && departmentId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>departmentId, 'department_id');
        }

        let localVarHeaders = this.defaultHeaders;
        if (token !== undefined && token !== null) {
            localVarHeaders = localVarHeaders.set('Token', String(token));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/feedbacks/getTransfer`;
        return this.httpClient.request<InlineResponse20043>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get details feedBack
     * @param processId 
     * @param departmentId 
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeedbacksProcessIdGetDetailsFeedBackGet(processId: string, departmentId?: string, token?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InlineResponse20042>;
    public apiFeedbacksProcessIdGetDetailsFeedBackGet(processId: string, departmentId?: string, token?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InlineResponse20042>>;
    public apiFeedbacksProcessIdGetDetailsFeedBackGet(processId: string, departmentId?: string, token?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InlineResponse20042>>;
    public apiFeedbacksProcessIdGetDetailsFeedBackGet(processId: string, departmentId?: string, token?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {
        if (processId === null || processId === undefined) {
            throw new Error('Required parameter processId was null or undefined when calling apiFeedbacksProcessIdGetDetailsFeedBackGet.');
        }

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (departmentId !== undefined && departmentId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>departmentId, 'departmentId');
        }

        let localVarHeaders = this.defaultHeaders;
        if (token !== undefined && token !== null) {
            localVarHeaders = localVarHeaders.set('Token', String(token));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/feedbacks/${this.configuration.encodeParam({name: "processId", value: processId, in: "path", style: "simple", explode: false, dataType: "string", dataFormat: undefined})}/getDetailsFeedBack`;
        return this.httpClient.request<InlineResponse20042>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * get feedbacks records list
     * @param processId 
     * @param employerId 
     * @param departmentId 
     * @param organizationId 
     * @param page 
     * @param limit 
     * @param token 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public apiFeedbacksRecordsListGet(processId?: string, employerId?: string, departmentId?: string, organizationId?: string, page?: string, limit?: string, token?: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<InlineResponse20039>;
    public apiFeedbacksRecordsListGet(processId?: string, employerId?: string, departmentId?: string, organizationId?: string, page?: string, limit?: string, token?: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpResponse<InlineResponse20039>>;
    public apiFeedbacksRecordsListGet(processId?: string, employerId?: string, departmentId?: string, organizationId?: string, page?: string, limit?: string, token?: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<HttpEvent<InlineResponse20039>>;
    public apiFeedbacksRecordsListGet(processId?: string, employerId?: string, departmentId?: string, organizationId?: string, page?: string, limit?: string, token?: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext}): Observable<any> {

        let localVarQueryParameters = new HttpParams({encoder: this.encoder});
        if (processId !== undefined && processId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>processId, 'processId');
        }
        if (employerId !== undefined && employerId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>employerId, 'employerId');
        }
        if (departmentId !== undefined && departmentId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>departmentId, 'departmentId');
        }
        if (organizationId !== undefined && organizationId !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>organizationId, 'organizationId');
        }
        if (page !== undefined && page !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>page, 'page');
        }
        if (limit !== undefined && limit !== null) {
          localVarQueryParameters = this.addToHttpParams(localVarQueryParameters,
            <any>limit, 'limit');
        }

        let localVarHeaders = this.defaultHeaders;
        if (token !== undefined && token !== null) {
            localVarHeaders = localVarHeaders.set('Token', String(token));
        }

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/api/feedbacks/recordsList`;
        return this.httpClient.request<InlineResponse20039>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
