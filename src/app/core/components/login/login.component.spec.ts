import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from '../../../shared/services/auth.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spy = jasmine.createSpyObj('AuthService', ['login'])
  // class mockAuthService {
  //   login() {}
  // }
    

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [{provide: AuthService, useValue: spy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#login should call login method of authService', ()=>{
    component.login();
    expect(spy.login).toHaveBeenCalledTimes(1);
  })
});
