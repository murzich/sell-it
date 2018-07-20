import { inject, TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from './session.service';
import createSpyObj = jasmine.createSpyObj;

describe('Session Service', () => {
  let service: SessionService;
  let cookie: jasmine.SpyObj<CookieService>;
  // token with expDate `new Date(2222222222000)`, which is approximately equal 2040 year.
  const validToken = 'test-token.MjIyMjIyMjIyMg==';

  beforeEach(() => {
    const cookieSpy = createSpyObj('CookieService', ['get', 'put', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        SessionService,
        {provide: CookieService, useValue: cookieSpy},
      ],
    });

    service = TestBed.get(SessionService);
    cookie = TestBed.get(CookieService);
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', inject([SessionService], (serviceAnother: SessionService) => {
    expect(serviceAnother).toBeTruthy();
  }));

  it('should create BS with true if token is valid', () => {
    const cookieStub = { get: () => {
        return validToken;
      }};

    service = new SessionService(cookieStub as CookieService);
    expect(service.isLoggedIn).toBe(true);
  });

  describe('get/set isLoggedIn', () => {
    const statusTest = true;

    it('should return value from loginStatus BS', () => {
      const loginStatusValueSpy = spyOnProperty(service.loginStatus, 'value')
        .and.returnValue(statusTest);

      const status = service.isLoggedIn;

      expect(status).toBe(statusTest);
      expect(loginStatusValueSpy).toHaveBeenCalled();
    });

    it('should cast value to loginStatus BS', () => {
      const loginStatusNextSpy = spyOn(service.loginStatus, 'next');

      service.isLoggedIn = statusTest;

      expect(loginStatusNextSpy).toHaveBeenCalled();
      expect(loginStatusNextSpy.calls.mostRecent().args[0])
        .toBe(statusTest);
    });
  });

  describe('.clearSession()', () => {
    it('should clear own token & userProfile', () => {
      const tokenSpy = spyOnProperty(service, 'token', 'set');
      const userSpy = spyOnProperty(service, 'userProfile', 'set');

      service.clearSession();

      expect(tokenSpy).toHaveBeenCalled();
      expect(userSpy).toHaveBeenCalled();
      expect(tokenSpy.calls.mostRecent().args[0]).toEqual(null);
      expect(userSpy.calls.mostRecent().args[0]).toEqual(null);
    });
  });

  describe('.isLoggedIn$ getter', () => {
    const statusTest = true;

    it('should transmit observable from loginStatus BS', () => {
      service.loginStatus = new BehaviorSubject<boolean>(true);

      service.isLoggedIn$.subscribe(
        (data) => {
          expect(data).toBe(statusTest);
        }
      );
    });

    it('should transmit observable from loginStatus BS', () => {
      service.isLoggedIn = true;

      service.isLoggedIn$.subscribe(
        (data) => {
          expect(data).toBe(statusTest);
        }
      );
    });

    it('subscription should be "false" by default', () => {
      service.isLoggedIn$.subscribe(
        (data) => {
          expect(data).toBe(false);
        }
      );
    });
  });

  describe('.isTokenExpired', () => {
    let tokenSpy: jasmine.Spy;
    let tokenExpDate: jasmine.Spy;

    beforeEach(() => {
      tokenSpy = spyOnProperty(service, 'token');
      tokenExpDate = spyOn(service, 'tokenExpDate');
    });

    it('should return false if token is absent', () => {
      tokenSpy.and.returnValue(undefined);

      const test = service.isTokenExpired();

      expect(test).toBe(false);
      expect(tokenSpy).toHaveBeenCalled();
      expect(tokenExpDate).not.toHaveBeenCalled();
    });

    it('should check for expiration date', () => {
      tokenSpy.and.returnValue(validToken);
      tokenExpDate.and.callThrough();

      const test = service.isTokenExpired();

      expect(test).toBe(false);
      expect(tokenSpy).toHaveBeenCalled();
      expect(tokenExpDate).toHaveBeenCalled();
      expect(tokenExpDate.calls.mostRecent().returnValue)
        .toEqual(new Date(2222222222000));
    });

    it('should return false if the token became expired', () => {
      const invalidToken = 'invalid-token';
      tokenSpy.and.returnValue(invalidToken);
      tokenExpDate.and.returnValue(new Date(Date.now() - 2000));

      const test = service.isTokenExpired();

      expect(test).toBe(true);
      expect(tokenSpy).toHaveBeenCalled();
      expect(tokenExpDate).toHaveBeenCalled();
    });
  });

  describe('.setSession', () => {
    const session = {
      user: {
        id: 1,
        username: 'UserName',
        email: 'user@email.com',
        avatar: null,
      },
      token: validToken,
    };

    it('should set this.token & this.userProfile', () => {
      const tokenSpy = spyOnProperty(service, 'token', 'set');
      const userSpy = spyOnProperty(service, 'userProfile', 'set');

      const test = service.setSession(session);

      expect(test).toBeUndefined();
      expect(tokenSpy).toHaveBeenCalled();
      expect(userSpy).toHaveBeenCalled();
      expect(tokenSpy.calls.mostRecent().args[0])
        .toEqual(session.token);
      expect(userSpy.calls.mostRecent().args[0])
        .toEqual(session.user);
    });
  });
});
