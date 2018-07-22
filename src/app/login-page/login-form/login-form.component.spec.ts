import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService as SocialAuthService } from 'angular5-social-login';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { LoginFormModel, RegistrationFormModel } from '../login.model';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let socialAuthService: jasmine.SpyObj<SocialAuthService>;
  let page: Page;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj(
      'AuthService',
      [
        'login',
        'register',
        'redirectOnSubscribe',
        'loginByGoogle',
      ],
    );
    const socialAuthSpy = jasmine.createSpyObj(
      'SocialAuthService',
      ['signIn'],
    );

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        LoginFormComponent,
      ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: SocialAuthService, useValue: socialAuthSpy},
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    auth = TestBed.get(AuthService);
    socialAuthService = TestBed.get(SocialAuthService);
    fixture = TestBed.createComponent(LoginFormComponent);
    page = new Page(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSubmit', () => {
    const testFormLogin: LoginFormModel = {
      email: 'user@email.com',
      passwordGroup: {
        password: '123456',
      },
    };
    const testFormRegister: RegistrationFormModel = {
      email: 'user@email.com',
      passwordGroup: {
        password: '123456',
        passwordConfirm: '123456',
      },
    };

    it('should subscribe to auth.register', () => {
      component.loginForm.value = testFormRegister;
      auth.register.and.returnValue(of());
      component.onSubmit();
      expect(auth.login).not.toHaveBeenCalled();
      expect(auth.register).toHaveBeenCalledTimes(1);
      expect(auth.register.calls.mostRecent().args[0])
        .toEqual(testFormRegister);
    });

    it('should subscribe to auth.login', () => {
      component.loginForm.value = testFormLogin;
      component.alreadyRegistered = true;
      auth.login.and.returnValue(of());
      component.onSubmit();
      expect(auth.login).toHaveBeenCalledTimes(1);
      expect(auth.login.calls.mostRecent().args[0])
        .toEqual(testFormLogin);
    });

    it('should set form errors', () => {
      const error = new HttpErrorResponse(
        {error: {message: 'invalid password'}, status: 404}
      );
      const spy = spyOn(component.loginForm, 'setErrors')
        .and.callThrough();
      auth.register.and.returnValue(throwError(error));
      component.onSubmit();

      expect(spy).toHaveBeenCalled();
      expect(spy.calls.mostRecent().args[0]).toEqual(error);
    });
  });

  describe('#switchForm', () => {

    it('should set login form', () => {
      component.switchForm('login');
      fixture.detectChanges();

      expect(component.alreadyRegistered).toBe(true);
      expect(component.submitButtonText).toBe('Login');
      expect(page.inputs.length).toBe(2);
    });

    it('should set register form', () => {
      component.switchForm('register');
      fixture.detectChanges();

      expect(component.alreadyRegistered).toBe(false);
      expect(component.submitButtonText).toBe('Sign Up');
      expect(page.inputs.length).toBe(3);
      console.log(component.passwordGroup);
    });
  });

  describe('#socialSignIn', () => {

    xit('should call socialAuth', () => {
      const userData = {token: 'token-string'};
      socialAuthService.signIn.and.returnValue(
        new Promise(() => userData)
      );
      auth.loginByGoogle.and.returnValue(of('OAuth-response'));
      component.socialSignIn('google');
      fixture.detectChanges();

      expect(socialAuthService.signIn).toHaveBeenCalled();
      fixture.whenStable().then(() => {
        expect(auth.loginByGoogle).toHaveBeenCalled();
        expect(auth.loginByGoogle.calls.mostRecent().args[0])
          .toBe(userData.token);
      });
    });
  });
});

class Page {
  get buttons() { return this.queryAll<HTMLButtonElement>('button'); }
  get signInTabBtn()   { return this.buttons[0]; }
  get signUpTabBtn()   { return this.buttons[1]; }
  get submitBtn()      { return this.buttons[2]; }
  get googleOAuthBtn() { return this.buttons[3]; }
  get inputs() { return this.queryAll<HTMLInputElement>('input'); }
  get emailInput()           { return this.inputs[0]; }
  get passwordInput()        { return this.inputs[1]; }
  get passwordConfirmInput() { return this.inputs[2]; }

  onSubmit: jasmine.Spy;
  switchForm: jasmine.Spy;
  socialSignIn: jasmine.Spy;

  constructor(private fixture: ComponentFixture<LoginFormComponent>) {
    const component = fixture.componentInstance;
    this.onSubmit = spyOn(component, 'onSubmit').and.callThrough();
    this.switchForm = spyOn(component, 'switchForm').and.callThrough();
    this.socialSignIn = spyOn(component, 'socialSignIn').and.callThrough();
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}
