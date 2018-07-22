import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
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
    // auth = TestBed.get(AuthService);
    socialAuthService = TestBed.get(SocialAuthService);
    fixture = TestBed.createComponent(LoginFormComponent);
    auth = fixture.debugElement.injector.get(AuthService);
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
    });
  });

  describe('#socialSignIn', () => {

    it('should call socialAuth', async(() => {
      const userData = {token: 'token-string'};
      const socSpy = socialAuthService.signIn.and.returnValue(
        new Promise((resolve) => { resolve(userData); })
      );
      auth.loginByGoogle.and.returnValue(of('OAuth-response'));
      component.socialSignIn('google');

      expect(socSpy).toHaveBeenCalled();
      expect(socialAuthService.signIn).toHaveBeenCalled();

      // Tests behaviour after promise from socialAuth.signIn
      fixture.whenStable().then(() => {
          fixture.detectChanges();
          expect(auth.loginByGoogle).toHaveBeenCalled();
          expect(auth.loginByGoogle.calls.mostRecent().args[0])
            .toBe(userData.token);
        });
    }));
  });

  describe('page form', () => {
    const testFormRegister: RegistrationFormModel = {
      email: 'user@email.com',
      passwordGroup: {
        password: '12345678',
        passwordConfirm: '12345678',
      },
    };

    it('should contain  all elements', () => {
      expect(page.buttons.length).toBe(4);
      expect(page.inputs.length).toBe(3);

      page.signInTabBtn.click();
      fixture.detectChanges();

      expect(page.inputs.length).toBe(2);
    });

    it('should change form', () => {
      page.signInTabBtn.click();
      fixture.detectChanges();

      expect(page.emailInput).toBeDefined();
      expect(page.passwordInput).toBeDefined();
      expect(page.passwordConfirmInput).toBeUndefined();
      expect(page.submitBtn.innerText).toContain('Login');

      page.signUpTabBtn.click();
      fixture.detectChanges();

      expect(page.emailInput).toBeDefined();
      expect(page.passwordInput).toBeDefined();
      expect(page.passwordConfirmInput).toBeDefined();
      expect(page.submitBtn.innerText).toContain('Sign Up');
    });

    it('should not submit if form is invalid', () => {
      expect(component.loginForm.valid).toBeFalsy();
      page.onSubmit.and.stub();

      page.submitBtn.click();
      fixture.detectChanges();

      expect(page.onSubmit).not.toHaveBeenCalled();
    });

    it('should submit inputs', async(() => {
      auth.register.and.returnValue(of());
      fixture.detectChanges();

      component.email.patchValue('user@email.com');
      component.password.patchValue('12345678');
      component.passwordConfirm.patchValue('12345678');

      fixture.detectChanges();

      expect(page.emailInput.value)
        .toBe('user@email.com');
      expect(page.passwordInput.value)
        .toBe('12345678');
      expect(page.passwordConfirmInput.value)
        .toBe('12345678');

      page.formDe.triggerEventHandler('submit', null);
      // page.submitBtn.click();
      fixture.detectChanges();

      expect(auth.login).not.toHaveBeenCalled();
      expect(auth.register).toHaveBeenCalledTimes(1);
      expect(auth.register.calls.mostRecent().args[0])
        .toEqual(testFormRegister);
    }));
  });

  describe('Validation', () => {
    let formGroup: FormGroup;

    beforeEach(() => {
      formGroup = component.loginForm;
    });

    it('should be invalid by default', () => {
      fixture.detectChanges();
      expect(formGroup.valid).toBeFalsy();
    });

    it('should be invalid required inputs', () => {
      fixture.detectChanges();
      expect(component.email.valid).toBeFalsy();
      expect(component.password.valid).toBeFalsy();
      expect(component.passwordConfirm.valid).toBeFalsy();
      expect(component.passwordGroup.valid).toBeFalsy();
      expect(formGroup.valid).toBeFalsy();

      page.signInTabBtn.click();
      fixture.detectChanges();
      expect(component.email.valid).toBeFalsy();
      expect(component.password.valid).toBeFalsy();
      expect(component.passwordGroup.valid).toBeFalsy();
      expect(formGroup.valid).toBeFalsy();
    });

    it('should be valid with right inner data', () => {
      component.email.patchValue('user@email.com');
      component.password.patchValue('123456abc');
      component.passwordConfirm.patchValue('123456abc');

      fixture.detectChanges();
      expect(component.email.valid).toBeTruthy('email');
      expect(component.password.valid).toBeTruthy('password');
      expect(component.passwordConfirm.valid).toBeTruthy('passwordConfirm');
      expect(component.passwordGroup.valid)
        .toBeTruthy('equality passwords');
      expect(formGroup.valid).toBeTruthy();

      page.signInTabBtn.click();
      fixture.detectChanges();
      expect(component.email.valid).toBeTruthy('email');
      expect(component.password.valid).toBeTruthy('password');
      expect(component.passwordGroup.valid)
        .toBeTruthy('equality passwords (not used)');
      expect(component.loginForm.valid).toBeTruthy();
    });

    it('should be invalid with incorrect email', () => {
      component.email.patchValue('3@d,');
      fixture.detectChanges();

      expect(component.email.valid).toBeFalsy();
    });

    it('should be invalid with short password', () => {
      component.password.patchValue('1');
      fixture.detectChanges();

      expect(component.password.valid).toBeFalsy();
    });

    it('should be invalid with unequal passwordConfirm', () => {
      component.password.patchValue('123412341234');
      component.passwordConfirm.patchValue('1');

      fixture.detectChanges();

      expect(component.passwordGroup.valid).toBeFalsy();
    });

    it('should disabling submit button if invalid', () => {
      expect(formGroup.valid).toBeFalsy();
      expect(page.submitBtn.disabled).toBeTruthy();
    });

    it('should handle click on Google OAuth', () => {
      const googleAuth = spyOn(component, 'socialSignIn').and.stub();

      page.googleOAuthBtn.click();
      fixture.detectChanges();

      expect(googleAuth).toHaveBeenCalled();
    });
  });

  describe('Validation errors', () => {

    it('should not display when untouched', () => {
      expect(page.validationErrors.length).toBe(0);
    });

    it('should display required errors when touched', () => {
      expect(page.validationErrors.length).toBe(0);

      component.email.markAsTouched();
      fixture.detectChanges();

      expect(page.validationErrors.length).toBe(1);
      expect(page.validationErrors[0].innerText)
        .toContain('Email is required');

      component.password.markAsTouched();
      fixture.detectChanges();


      expect(page.validationErrors.length).toBe(2);
      expect(page.validationErrors[1].innerText)
        .toContain('Password is required');
    });

    it('should display wrong email error', () => {
      expect(page.validationErrors.length).toBe(0);

      component.email.patchValue('email#not,email');
      component.email.markAsTouched();
      fixture.detectChanges();

      expect(page.validationErrors.length).toBe(1);
      expect(page.validationErrors[0].innerText)
        .toContain('Email is unacceptable');
    });

    it('should display short password error', () => {
      expect(page.validationErrors.length).toBe(0);

      component.password.patchValue('123');
      component.password.markAsTouched();
      fixture.detectChanges();

      expect(page.validationErrors.length).toBe(1);
      expect(page.validationErrors[0].innerText)
        .toContain('Password is too short');
    });

    it('should display unequal passwords error', () => {
      expect(page.validationErrors.length).toBe(0);

      component.password.patchValue('123456abc');
      component.password.markAsTouched();
      component.passwordConfirm.patchValue('123');
      component.passwordConfirm.markAsTouched();
      fixture.detectChanges();

      expect(page.validationErrors.length).toBe(1);
      expect(page.validationErrors[0].innerText)
        .toContain('Passwords are different');
    });

    it('should display server errors', () => {
      auth.register.and.returnValue(throwError({
        email: ['Bad email'],
        password1: ['Wrong password'],
        non_field_errors: ['Can\'t find user with this credentials'],
        username: ['username is already taken'],
      }));
      component.onSubmit();
      fixture.detectChanges();

      expect(page.validationErrors.length).toBe(4);
      expect(page.validationErrors[0].innerText)
        .toContain('Bad email');
      expect(page.validationErrors[1].innerText)
        .toContain('Wrong password');
      expect(page.validationErrors[2].innerText)
        .toContain('Can\'t find user with this credentials');
      expect(page.validationErrors[3].innerText)
        .toContain('username is already taken');
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
    get formDe() { return this.queryDe('form'); }
    get form()   { return this.formDe.nativeElement; }
    get validationErrors() {
      return this.queryAll<HTMLElement>('.input-error');
    }

    onSubmit: jasmine.Spy;

    constructor(fixture: ComponentFixture<LoginFormComponent>) {
      const component = fixture.componentInstance;
      this.onSubmit = spyOn(component, 'onSubmit')
        .and.callThrough();
    }

    private queryDe(selector: string) {
      return fixture.debugElement.query(By.css(selector));
    }

    private queryAll<T>(selector: string): T[] {
      return fixture.nativeElement.querySelectorAll(selector);
    }
  }
});
