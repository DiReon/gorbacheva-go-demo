import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

import { LoginComponent } from './login.component';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy = jasmine.createSpyObj('AuthService', ['login'])
  let userSpy = jasmine.createSpyObj('UserService', ['cancelAllQuizzes'])

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide: AuthService, useValue: authSpy},
        {provide: UserService, useValue: userSpy},
      ],
      imports: [
        FormsModule
      ]
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
    expect(authSpy.login).toHaveBeenCalledTimes(1);
  })
});
