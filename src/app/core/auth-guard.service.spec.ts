import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';

describe('AuthGuardService', () => {
  let service: AuthGuard;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let hasTokenSpy: jasmine.Spy;
  let redirectUrlSpy: jasmine.Spy;

  const url = 'test-url';

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['hasToken', 'redirectUrl']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authSpy},
        {provide: Router, useValue: routerSpy},
      ]
    });

    service = TestBed.get(AuthGuard);
    auth = TestBed.get(AuthService);
    router = TestBed.get(Router);

    // Redefined props for next spyOnProp'ing on them (needed get & set for that)
    Object.defineProperties(auth, {
      'hasToken': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      },
      'redirectUrl': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
        set: () => undefined,
      }
    });
      hasTokenSpy = spyOnProperty(auth, 'hasToken');
      redirectUrlSpy = spyOnProperty(auth, 'redirectUrl', 'set');
  });

  describe('Initialization test', () => {
    it('should have instance', () => {
      expect(service).toBeDefined();
    });

    it('should be injectable', inject([AuthGuard], (guard) => {
      expect(guard).toBeTruthy();
    }));
  });

  describe('.canActivate', () => {

    it('should return an observable', () => {
      const checkLoginSpy = spyOn(service, 'checkLogin').and.returnValue(true);

      expect(service.canActivate(undefined, <RouterStateSnapshot>{url: url}))
        .toBe(true, 'service return is wrong');
      expect(checkLoginSpy.calls.count())
        .toBe(1, 'called once');
      expect(checkLoginSpy.calls.mostRecent().args[0])
        .toBe(url, 'id is equal');
    });
  });

  describe('.checkLogin', () => {

    it('should return true when token exist', () => {
      hasTokenSpy.and.returnValue(true);

      expect(service.checkLogin(url)).toBe(true);
      expect(hasTokenSpy).toHaveBeenCalledTimes(1);
      expect(redirectUrlSpy).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to /login & return false', () => {
      hasTokenSpy.and.returnValue(false);

      expect(service.checkLogin(url)).toBe(false);
      expect(hasTokenSpy).toHaveBeenCalledTimes(1);
      expect(redirectUrlSpy).toHaveBeenCalledTimes(1);
      expect(redirectUrlSpy.calls.mostRecent().args[0])
        .toEqual(url);
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate.calls.mostRecent().args[0])
        .toEqual(['/login']);
    });
  });
});
