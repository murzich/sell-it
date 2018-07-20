import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { UnAuthGuard } from './unauth-guard.service';

describe('UnAuthGuardService', () => {
  let service: UnAuthGuard;
  let auth: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let hasTokenSpy: jasmine.Spy;
  let redirectUrlSpy: jasmine.Spy;

  const url = '/profile';

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['hasToken', 'redirectUrl']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UnAuthGuard,
        {provide: AuthService, useValue: authSpy},
        {provide: Router, useValue: routerSpy},
      ]
    });

    service = TestBed.get(UnAuthGuard);
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

    it('should be injectable', inject([UnAuthGuard], (guard) => {
      expect(guard).toBeTruthy();
    }));
  });

  describe('.canActivate', () => {

    it('should return the checkLogin return value', () => {
      const checkLoginSpy = spyOn(service, 'checkLogin').and.returnValue(true);

      expect(service.canActivate(undefined, undefined))
        .toBe(true, 'service return is wrong');
      expect(checkLoginSpy.calls.count())
        .toBe(1, 'called once');
    });
  });

  describe('.checkLogin', () => {

    it('should return false & redirect to /profile when token exist', () => {
      hasTokenSpy.and.returnValue(true);

      expect(service.checkLogin()).toBe(false);
      expect(hasTokenSpy).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate.calls.mostRecent().args[0])
        .toEqual([url], 'id is equal');
    });

    it('should return true when token is absent', () => {
      hasTokenSpy.and.returnValue(false);

      expect(service.checkLogin()).toBe(true);
      expect(hasTokenSpy).toHaveBeenCalledTimes(1);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
