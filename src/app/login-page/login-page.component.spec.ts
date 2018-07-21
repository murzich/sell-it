import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../core/auth.service';

import { LoginPageComponent } from './login-page.component';

@Component({ selector: 'app-login-form', template: '' })
class AppLoginStubComponent {}

@Component({ selector: 'app-footer', template: ''})
class FooterStubComponent {}

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let auth: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['verifyEmail']);
    const routeStub = {
      queryParams: of(2),
    };

    TestBed.configureTestingModule({
      declarations: [
        LoginPageComponent,
        AppLoginStubComponent,
        FooterStubComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    auth = TestBed.get(AuthService);
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
