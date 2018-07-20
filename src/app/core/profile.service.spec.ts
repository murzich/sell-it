import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import ApiUrls from './api-urls';
import { UserProfile } from './models/user.model';
import { ProfileService } from './profile.service';
import { SessionService } from './session.service';

describe('Profile Service', () => {
  let service: ProfileService;
  let session: SessionService;
  let httpMock: HttpTestingController;

  let isLoggedIn$Spy: jasmine.Spy;
  let userProfileGetSpy: jasmine.Spy;
  let userProfileSetSpy: jasmine.Spy;
  let tokenSpy: jasmine.Spy;

  const url = ApiUrls.profile;
  const userProfileJson = {
    username: 'test-User',
    avatar: null,
    email: 'user@email.com',
    id: 666,
  };
  const userProfileMapped = new UserProfile(userProfileJson);

  beforeEach(() => {
    const sessionMock = {
      // isLoggedIn$ must have observable on init, it's used on service creation.
      get isLoggedIn$() { return of(true); },
      get token() { return undefined; },
      get userProfile() { return {username: 'InitUser'}; },
      set userProfile(value) { },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProfileService,
        {provide: SessionService, useValue: sessionMock},
      ],
    });

    service = TestBed.get(ProfileService);
    session = TestBed.get(SessionService);
    httpMock = TestBed.get(HttpTestingController);

    Object.defineProperties(session, {
      'isLoggedIn$': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      },
      'token': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
      },
      'userProfile': {
        configurable: true,
        enumerable: true,
        get: () => undefined,
        set: (value) => undefined,
      },
    });

    isLoggedIn$Spy = spyOnProperty(session, 'isLoggedIn$');
    userProfileGetSpy = spyOnProperty(session, 'userProfile');
    userProfileSetSpy = spyOnProperty(session, 'userProfile', 'set');
    tokenSpy = spyOnProperty(session, 'token');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be created', inject([ProfileService], (serviceAnother: ProfileService) => {
    expect(serviceAnother).toBeTruthy();
  }));

  describe('profile$', () => {
    it('should execute a condition .hasTokenWithoutProfile', () => {
      userProfileGetSpy.and.returnValue(null);
      tokenSpy.and.returnValue('defined');
      expect(service.hasTokenWithoutProfile()).toBe(true);

      userProfileGetSpy.and.returnValue(null);
      tokenSpy.and.returnValue(undefined);
      expect(service.hasTokenWithoutProfile()).toBe(false);

      userProfileGetSpy.and.returnValue(userProfileJson);
      tokenSpy.and.returnValue('defined');
      expect(service.hasTokenWithoutProfile()).toBe(false);
    });

    it('getFreshProfile$ should get new Profile from backend', () => {
      const spy = spyOn(service.profile, 'next').and.callThrough();
      const spyObs = spyOn(service.profile, 'asObservable').and.callThrough();
      service.getFreshProfile$().subscribe(
        (res) => {
          expect(userProfileSetSpy).toHaveBeenCalled();
          expect(userProfileSetSpy.calls.mostRecent().args[0])
            .toEqual(userProfileMapped);
          expect(spy).toHaveBeenCalled();
          expect(spy.calls.mostRecent().args[0]).toEqual(userProfileMapped);
          expect(spyObs).toHaveBeenCalled();
          expect(res).toEqual(userProfileMapped);
        }
      );

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(userProfileJson);
    });

    // TODO: Add error checking
    it('should cast observable with current UserProfile', () => {
      const spyCondition = spyOn(service, 'hasTokenWithoutProfile')
        .and.returnValue(true);
      const spyWorker = spyOn(service, 'getFreshProfile$')
        .and.callThrough();
      service.profile$.subscribe( (profile) => {
        expect(spyCondition).toHaveBeenCalled();
        expect(spyWorker).toHaveBeenCalled();
        expect(spyCondition).toHaveBeenCalledBefore(spyWorker);
        expect(profile).toEqual(userProfileMapped);
      });

      // spyWorker gets it's internal data from backend.
      const req = httpMock.expectOne(url);
      req.flush(userProfileJson);
    });
  });
});
