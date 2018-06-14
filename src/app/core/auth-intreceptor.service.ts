import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionService } from './session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionService: SessionService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionService.token !== undefined) {
      const authHeader = `JWT ${this.sessionService.token}`;
      const authReq = req.clone({headers: req.headers.set('Authorization', authHeader )});
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
