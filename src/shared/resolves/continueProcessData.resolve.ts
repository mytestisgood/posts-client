import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {catchError, Observable, of, tap} from 'rxjs';
import {IS_LOGGED_IN, REGISTRATION_DATA, TOKEN, UserProcessDataByStepResponse} from "@shared/entities";
import {SessionStorageService} from "@shared/web-api";
import {RegisterService} from "@shared/api/services";

@Injectable()
export class ContinueProcessResolve implements Resolve<any> {

  constructor(private readonly sessionStorageService: SessionStorageService,
              private readonly registerService: RegisterService) {
  }

  public resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const isContinue = route.queryParams['isContinue'];

    if (isContinue) {
      this.sessionStorageService.setItem(TOKEN, route.queryParams['token'] as string);
      return this.registerService.getUserProcessDataByStep().pipe();
    } else {
      return of(true);
    }
  }
}
