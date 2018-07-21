import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService as SocialAuthService } from 'angular5-social-login';
import { AuthService } from '../../core/auth.service';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  let socialAuthService: jasmine.SpyObj<SocialAuthService>;


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
    const socialAuthSpy = jasmine.createSpyObj('SocialAuthService', ['signIn']);

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
