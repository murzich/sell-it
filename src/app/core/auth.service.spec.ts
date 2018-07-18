import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import ApiUrls from './api-urls';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let session: jasmine.SpyObj<SessionService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const sessionSpy = jasmine.createSpyObj(
      'SessionService',
      ['setSession', 'clearSession', 'token', 'isLoggedIn']
    );

    const routerSpy = jasmine.createSpyObj(
      'Router',
      ['navigate']
    );

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: SessionService, useValue: sessionSpy},
        {provide: Router, useValue: routerSpy},
      ]
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    session = TestBed.get(SessionService);
    router = TestBed.get(Router);

    // Redefined props for next spyOnProp'ing on them (needed get & set for that)
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
        set: () => undefined,
      }
    });
  });

  describe('Initialization test', () => {
    it('should have instance', () => {
      expect(service).toBeDefined();
    });

    it('should be injectable', inject([AuthService], (auth) => {
      expect(auth).toBeTruthy();
    }));
  });

  describe('.hasToken getter', () => {
    it('should return value of sessionService isLoggedIn', () => {
      const isLoggedInSpy = spyOnProperty(session, 'isLoggedIn').and.returnValue(true);
      const testLogin = service.hasToken;

      expect(testLogin).toBe(true, 'value incorrect');
      expect(isLoggedInSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('.login POST method', () => {
    const url = ApiUrls.login;
    const formData = {
      email: 'user@email.com',
      passwordGroup: {password: '123456'},
    };
    const expectedResponse = {
      user: {
        email: 'user@email.com',
        id: 1,
        avatar: null,
        username: 'User'
      },
      token: 'test-token',
    };
    const handledErrorMsg = 'handled error';

    beforeEach(() => {
      spyOn(service, 'handleError').and.returnValue(throwError(handledErrorMsg));
    });

    it('should return userData and token', () => {
      const preparedData = { email: formData.email, password: formData.passwordGroup.password };

      service.login(formData).subscribe(
        (response) => expect(response).toEqual(expectedResponse)
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');
      expect(req.request.method).toBe('POST', 'http mehod wasn\'t POST');
      expect(({...req.request.body})).toEqual(preparedData, 'backend gets unexpected data');

      req.flush(expectedResponse);
    });

    it('should call sessionService', () => {
      service.login(formData).subscribe(
        (response) => {
          expect(session.setSession.calls.count())
            .toBe(1, 'wasn\'t called once');
          expect(session.setSession.calls.mostRecent().args[0])
            .toEqual(expectedResponse, 'response data was changed');

          expect(service.handleError.calls.count())
            .toBe(0, 'Error handler fn was called');
        }
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');

      req.flush(expectedResponse);
    });

    it('should handle errors', () => {
      const emsg = 'deliberate 400 error';

      service.login(formData).subscribe(
        data => fail('should have failed with the 400 error'),
        (error) => {
          // The errors are handling before they will be thrown outside.
          expect(error.status).not.toEqual(400, 'status');
          expect(error.error).not.toEqual(emsg, 'message');

          expect(session.setSession.calls.count())
            .not.toBeGreaterThan(0, 'setSession shouldn\'t be called');
          expect(service.handleError.calls.count())
            .toBe(1, 'Error handler fn wasn\'t called');

          expect(error).toBe(handledErrorMsg);
        }
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');

      req.flush(emsg, {status: 400, statusText: 'Bad request'});

      httpMock.verify();
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.login(formData).subscribe(
        data => fail('should have failed with the network error'),
        (error) => {
          expect(error.message).not.toEqual(emsg, 'message');

          expect(session.setSession.calls.count())
            .not.toBeGreaterThan(0, 'setSession shouldn\'t be called');
          expect(service.handleError.calls.count())
            .toBe(1, 'Error handler fn wasn\'t called');

          expect(error).toBe(handledErrorMsg);
        }
      );

      const req = httpMock.expectOne(url);

      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });

      req.error(mockError);
    });
  });

  describe('.loginByGoogle method', () => {
    const url = ApiUrls.googleAuth;
    const token = 'test-token';
    const response = 'test-response';

    it('should send token to backend', () => {
      service.loginByGoogle(token).subscribe(
        (data) => expect(data).toBe(response)
      );

      const req = httpMock.expectOne(url, 'url aren\'t match');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({access_token: token});

      req.flush(response);
      httpMock.verify();
    });

    it('can test for 400 error', () => {
      const emsg = 'deliberate 400 error';

      service.loginByGoogle(token).subscribe(
        data => fail('should have failed with the 400 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(url);

      req.flush(emsg, { status: 400, statusText: 'Bad request' });
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.loginByGoogle(token).subscribe(
        data => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.error.message).toEqual(emsg, 'message');
        }
      );

      const req = httpMock.expectOne(url);

      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });
      req.error(mockError);
    });
  });

  describe('.logout$ method', () => {
    const url = ApiUrls.logout;
    const response = {detail: 'Successfully logged out!'};

    it('should send GET request to backend', () => {
      service.logout$.subscribe((data) => {
          expect(data).toEqual(data, 'data isn\'t equal');
        });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');

      req.flush(response);
    });

    it('should call SessionService.clearSession()', () => {
      service.logout$.subscribe((data) => {
        expect(data).toEqual(data, 'data isn\'t equal');

        expect(session.clearSession.calls.count())
          .toBe(1, 'must be called at once');
      });

      httpMock.expectOne(url).flush(response);
    });

    it('can test for 400 error', () => {
      const emsg = 'deliberate 400 error';

      service.logout$.subscribe(
        data => fail('should have failed with the 400 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(400, 'status');
          expect(error.error).toEqual(emsg, 'message');

          expect(session.clearSession.calls.count())
            .toBe(1, 'should logout in the app level anyway');
        }
      );

      const req = httpMock.expectOne(url);

      req.flush(emsg, { status: 400, statusText: 'Bad request' });
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.logout$.subscribe(
        data => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.error.message).toEqual(emsg, 'message');

          expect(session.clearSession.calls.count())
            .toBe(1, 'should logout in the app level anyway');
        }
      );

      const req = httpMock.expectOne(url);

      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });
      req.error(mockError);
    });
  });

  describe('.redirectOnSubscribe method', () => {
    let redirectUrl: string;
    let isLoggedInSpy: jasmine.Spy;

    beforeEach( () => {
      isLoggedInSpy = spyOnProperty(session, 'isLoggedIn');
    });

    it('should redirect if loggedIn', () => {
      redirectUrl = '';
      isLoggedInSpy.and.returnValue(true);
      service.redirectUrl = redirectUrl;

      // Called twice because the method returns function.
      service.redirectOnSubscribe()();

      expect(isLoggedInSpy).toHaveBeenCalled();
      expect(service.redirectUrl)
        .toBe(redirectUrl, 'redirect url shouldn\'t change');
      expect(router.navigate.calls.count())
        .toBe(1, 'should call router.navigate');
      expect(router.navigate.calls.mostRecent().args[0])
        .toEqual(['/product']);
    });

    it('should redirect to custom redirectUrl', () => {
      redirectUrl = '/test';
      service.redirectUrl = redirectUrl;
      isLoggedInSpy.and.returnValue(true);

      service.redirectOnSubscribe()();

      expect(isLoggedInSpy).toHaveBeenCalled();
      expect(router.navigate.calls.mostRecent().args[0])
        .toEqual([redirectUrl]);
    });

    it('should not navigate if is not logged in', () => {
      isLoggedInSpy.and.returnValue(false);

      service.redirectOnSubscribe()();

      expect(router.navigate).not.toHaveBeenCalled();
      expect(isLoggedInSpy).toHaveBeenCalled();
    });
  });

  describe('.register POST method', () => {
    const url = ApiUrls.register;
    const formData = {
      email: 'user@email.com',
      passwordGroup: {
        password: '123456',
        passwordConfirm: '123456',
      },
    };
    const expectedResponse = {
      user: {
        email: 'user@email.com',
        id: 1,
        avatar: null,
        username: 'User'
      },
      token: 'test-token',
    };
    const handledErrorMsg = 'handled error';

    beforeEach(() => {
      spyOn(service, 'handleError').and.returnValue(throwError(handledErrorMsg));
    });

    it('should return userData and token', () => {
      const preparedData = {
        email: formData.email,
        password1: formData.passwordGroup.password,
        password2: formData.passwordGroup.password,
        username: undefined,
      };

      service.register(formData).subscribe(
        (response) => expect(response).toEqual(expectedResponse)
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');
      expect(req.request.method).toBe('POST', 'http mehod wasn\'t POST');
      expect(({...req.request.body})).toEqual(preparedData, 'backend gets unexpected data');

      req.flush(expectedResponse);
    });

    it('should call sessionService', () => {
      service.register(formData).subscribe(
        (response) => {
          expect(session.setSession.calls.count())
            .toBe(1, 'wasn\'t called once');
          expect(session.setSession.calls.mostRecent().args[0])
            .toEqual(expectedResponse, 'response data was changed');

          expect(service.handleError.calls.count())
            .toBe(0, 'Error handler fn was called');
        }
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');

      req.flush(expectedResponse);
    });

    it('should handle errors', () => {
      const emsg = 'deliberate 400 error';

      service.register(formData).subscribe(
        data => fail('should have failed with the 400 error'),
        (error) => {
          // The errors are handling before they will be thrown outside.
          expect(error.status).not.toEqual(400, 'status');
          expect(error.error).not.toEqual(emsg, 'message');

          expect(session.setSession.calls.count())
            .not.toBeGreaterThan(0, 'setSession shouldn\'t be called');
          expect(service.handleError.calls.count())
            .toBe(1, 'Error handler fn wasn\'t called');

          expect(error).toBe(handledErrorMsg);
        }
      );

      const req = httpMock.expectOne(url, 'urls is not as expected');

      req.flush(emsg, {status: 400, statusText: 'Bad request'});

      httpMock.verify();
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';

      service.register(formData).subscribe(
        data => fail('should have failed with the network error'),
        (error) => {
          expect(error.message).not.toEqual(emsg, 'message');

          expect(session.setSession.calls.count())
            .not.toBeGreaterThan(0, 'setSession shouldn\'t be called');
          expect(service.handleError.calls.count())
            .toBe(1, 'Error handler fn wasn\'t called');

          expect(error).toBe(handledErrorMsg);
        }
      );

      const req = httpMock.expectOne(url);

      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });

      req.error(mockError);
    });
  });

  describe('.tokenRefresh()', () => {
    const url = ApiUrls.tokenRefresh;
    const existingToken = 'existing-token';
    const updatedToken = 'updated-token';
    let tokenGetSpy: jasmine.Spy;
    let tokenSetSpy: jasmine.Spy;

    beforeEach(() => {
      tokenGetSpy = spyOnProperty(session, 'token', 'get');
      tokenSetSpy = spyOnProperty(session, 'token', 'set');
    });

    it('should send existing token & receive updated', () => {
      tokenGetSpy.and.returnValue(existingToken);

      service.tokenRefresh().subscribe(
        (data) => {
          expect(data).
          toEqual({ token: updatedToken }, 'responded token isn\'t as expected');

          expect(tokenGetSpy).toHaveBeenCalledTimes(1);
          expect(tokenSetSpy).toHaveBeenCalledTimes(1);
        }
      );

      const req = httpMock.expectOne(url, 'url doesn\'t match');
      expect(req.request.method)
        .toBe('POST', 'wrong method call');
      expect(req.request.body)
        .toEqual({ token: existingToken});

      req.flush({ token: updatedToken });

      httpMock.verify();
    });

    it('shouldn\'t do anything when there isn\'t token', () => {
      tokenGetSpy.and.returnValue(true);

      service.tokenRefresh().subscribe(
        () => fail(),
        () => fail(),
        () => {
          expect(tokenGetSpy).toHaveBeenCalled();
        } );

      httpMock.expectOne(url);
      httpMock.verify();
    });
  });
});
