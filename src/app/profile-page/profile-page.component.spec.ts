import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { ProfileService } from '../core/profile.service';

import { ProfilePageComponent } from './profile-page.component';


@Component({selector: 'app-header', template: ''})
class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent { }


describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let auth: jasmine.SpyObj<AuthService>;
  const user = {
    username: 'test-User',
    avatar: null,
    email: 'user@email.com',
    id: 666,
  };

  beforeEach(async(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['verifyEmail']);
    const routeStub = {
      queryParams: of(2),
    };
    const profileStub = {
      profile$: of(user),
      putProfile$: of(user),
      patchProfile$: of(user),

    };

    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [
        ProfilePageComponent,
        HeaderStubComponent,
        FooterStubComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProfileService, useValue: profileStub },
        { provide: AuthService, useValue: authSpy },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    auth = TestBed.get(AuthService);
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
