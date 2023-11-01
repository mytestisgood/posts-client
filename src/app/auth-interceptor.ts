import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorageService } from '@shared/web-api';
import { TOKEN } from '@shared/entities';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly injector: Injector,
    private readonly sessionStorageService: SessionStorageService,
  ) {}
  public intercept(req: HttpRequest<Request>, next: HttpHandler): Observable<HttpEvent<Request>> {
    if (this.sessionStorageService.getItem(TOKEN)) {
      const reqCopy = req.clone({
        headers: req.headers
          .set('Token', this.sessionStorageService.getItem(TOKEN) as string)
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
