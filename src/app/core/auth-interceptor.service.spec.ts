import { HttpHandler, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-intreceptor.service';
import { SessionService } from './session.service';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;
  let session: jasmine.SpyObj<SessionService>;
  let httpHandler: jasmine.SpyObj<HttpHandler>;
  let isLoggedInSpy: jasmine.Spy;
  let tokenSpy: jasmine.Spy;

  beforeEach(() => {
    const sessionSpy = jasmine.createSpyObj('SessionService', ['isLoggedIn', 'token']);
    const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        {provide: SessionService, useValue: sessionSpy},
        {provide: HttpHandler, useValue: httpHandlerSpy},
      ],
    });

    service = TestBed.get(AuthInterceptor);
    session = TestBed.get(SessionService);
    httpHandler = TestBed.get(HttpHandler);

    Object.defineProperties(session, {
      'isLoggedIn': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      },
      'token': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      }
    });
    isLoggedInSpy = spyOnProperty(session, 'isLoggedIn');
    tokenSpy = spyOnProperty(session, 'token');
  });

  describe('.intercept method', () => {
    const reqFake = new HttpRequest('GET', 'test');
    const token = 'test-token';
    const authHeader = `JWT ${token}`;
    const reqWithAuthFake = reqFake.clone({
      headers: reqFake.headers.set('Authorization', authHeader),
    });

    it('shouldn\'t modify if token doesn\'t exist', () => {
      isLoggedInSpy.and.returnValue(false);

      service.intercept(reqFake, httpHandler);

      expect(isLoggedInSpy).toHaveBeenCalled();
      expect(httpHandler.handle).toHaveBeenCalled();
      expect(httpHandler.handle.calls.mostRecent().args[0])
        .toEqual(reqFake);
      expect(tokenSpy).not.toHaveBeenCalled();
    });

    it('should add Auth header with existing token', () => {
      isLoggedInSpy.and.returnValue(true);
      tokenSpy.and.returnValue(token);

      service.intercept(reqFake, httpHandler);

      expect(isLoggedInSpy).toHaveBeenCalled();
      expect(httpHandler.handle.calls.mostRecent().args[0])
        .toEqual(reqWithAuthFake);
      expect(tokenSpy).toHaveBeenCalled();
    });
  });
});
