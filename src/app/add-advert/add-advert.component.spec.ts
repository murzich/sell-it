import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddAdvertComponent } from './add-advert.component';
import { AddAdvertService } from './add-advert.service';


@Component({selector: 'app-header', template: ''})
class HeaderStubComponent { }

@Component({selector: 'app-footer', template: ''})
class FooterStubComponent { }

describe('AddAdvertComponent', () => {
  let component: AddAdvertComponent;
  let fixture: ComponentFixture<AddAdvertComponent>;
  let advertService: jasmine.SpyObj<AddAdvertService>;

  beforeEach(async(() => {
    const spyAdvertService = jasmine.createSpyObj('AddAdvertService', ['postAdvWithImages$']);

    TestBed.configureTestingModule({
      declarations: [
        AddAdvertComponent,
        HeaderStubComponent,
        FooterStubComponent,
      ],
      imports: [
        ReactiveFormsModule,
      ],
      providers: [
        {provide: AddAdvertService, useValue: spyAdvertService},
      ],
      // schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    advertService = TestBed.get(AddAdvertService);
    fixture = TestBed.createComponent(AddAdvertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
