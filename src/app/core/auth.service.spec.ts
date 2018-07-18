import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import ApiUrls from './api-urls';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpApi: HttpTestingController;
  let session: jasmine.SpyObj<SessionService>;
  let router: Router;

  const sessionIsLoggedIn = true;

  beforeEach(() => {
    const sessionSpy = jasmine.createSpyObj('SessionService', ['setSession', 'clearSession', 'token']);
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
    httpApi = TestBed.get(HttpTestingController);
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

    it('should return userData and token', () => {
      const preparedData = { email: formData.email, password: formData.passwordGroup.password };

      service.login(formData).subscribe(
        (response) => expect(response).toEqual(expectedResponse)
      );

      const req = httpApi.expectOne(url, 'urls is not as expected');
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
        }
      );

      const req = httpApi.expectOne(url, 'urls is not as expected');

      req.flush(expectedResponse);
    });

    it('should handle errors', () => {
      const emsg = 'deliberate 400 error';
      spyOn(service, 'handleError').and.callThrough();

      service.login(formData).subscribe(
        data => fail('should have failed with the 400 error'),
        (error: HttpErrorResponse) => {
          // The errors are handling & aren't thrown outside.
          expect(error.status).not.toEqual(400, 'status');
          expect(error.error).not.toEqual(emsg, 'message');

          expect(session.setSession.calls.count())
            .not.toBeGreaterThan(0, 'setSession shouldn\'t be called');
          expect(service.handleError.calls.count())
            .toBe(1, 'Error handler fn wasn\'t called');
        }
      );

      const req = httpApi.expectOne(url, 'urls is not as expected');

      // Respond with mock error
      req.flush(emsg, {status: 400, statusText: 'Bad request'});

      httpApi.verify();
    });

    it('can test for network error', () => {
      const emsg = 'simulated network error';
      // TODO: extract copypast;
      spyOn(service, 'handleError').and.callThrough();

      service.login(formData).subscribe(
        data => fail('should have failed with the network error'),
        (error: HttpErrorResponse) => {
          expect(error.message).toEqual(emsg, 'message');
          // TODO: add expection of calling errorHanler
        }
      );

      const req = httpApi.expectOne(url);

      // Create mock ErrorEvent, raised when something goes wrong at the network level.
      // Connection timeout, DNS error, offline, etc
      const mockError = new ErrorEvent('Network error', {
        message: emsg,
      });

      // Respond with mock error
      req.error(mockError);
    });
  });
});
