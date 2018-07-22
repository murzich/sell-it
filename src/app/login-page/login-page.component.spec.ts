import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, of } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { FooterStubComponent, LoginFormStubComponent } from '../testing/stub-components';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let router: ActivatedRoute;
  let verifySpy: jasmine.Spy;
  const keyObj = {key: 'key-string'};

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['verifyEmail']);
    const routeStub = {
      queryParams: of({key: undefined}),
    };

    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent,
        LoginFormStubComponent,
        FooterStubComponent,
      ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: ActivatedRoute, useValue: routeStub},
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    auth = TestBed.get(AuthService);
    router = TestBed.get(ActivatedRoute);
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;

    verifySpy = auth.verifyEmail.and.returnValue(EMPTY);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('verify an emailed key', () => {
    it('should save a key', () => {
      expect(component.keyObject).toBeUndefined('not set yet');
      expect(verifySpy).not.toHaveBeenCalled();
      expect(spyOn(router, 'queryParams')).not.toHaveBeenCalled();

      router.queryParams = of(keyObj);
      component.ngOnInit();

      expect(component.keyObject).toEqual(keyObj, 'gotten from params');
      expect(verifySpy).toHaveBeenCalledTimes(1);
      expect(verifySpy.calls.mostRecent().args[0]).toBe(keyObj);
    });
  });
});
