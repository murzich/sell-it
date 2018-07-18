import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';

import ApiUrls from './api-urls';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let session: jasmine.SpyObj<SessionService>;
  let router: Router;

  const sessionIsLoggedIn = true;

  beforeEach(() => {
    const sessionSpy = jasmine.createSpyObj(
      'SessionService',
      ['setSession', 'clearSession', 'token']
    );
    sessionSpy.isLoggedIn = sessionIsLoggedIn;

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        AuthService,
        {provide: SessionService, useValue: sessionSpy}
      ]
    });

    service = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    session = TestBed.get(SessionService);
    router = TestBed.get(Router);

    router.initialNavigation();
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
      const testLogin = service.hasToken;

      expect(testLogin).toBe(sessionIsLoggedIn, 'value incorrect');
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
});
