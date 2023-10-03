import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from '@shared/services';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly injector: Injector,
    private readonly loginService: LoginService,
  ) {}
  public intercept(req: HttpRequest<Request>, next: HttpHandler): Observable<HttpEvent<Request>> {
    if (this.loginService.currentToken$.value) {
      const reqCopy = req.clone({
        headers: req.headers
          .set('Token', this.loginService.currentToken$.value as string)
          .set('Project', 'smarti-dev')
          .append('Accept', 'application/json'),
      });

      return next.handle(reqCopy);
    }

    return next.handle(req);
  }
}

export const AuthHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};