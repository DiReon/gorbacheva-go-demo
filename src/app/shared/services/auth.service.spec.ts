import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';

let mockUser = {name: "Mock User", id: "mockID"}

describe('AuthService', () => {
  let service: AuthService;
  let spy = jasmine.createSpyObj('UserService', ['save'])
  let signInWithPopupSpy = jasmine.createSpyObj('SignInWithPopup', ['then'])
  signInWithPopupSpy.then.and.returnValue(spy.save(mockUser))
  let afStub = {
    authState: of(mockUser),
    signInWithPopup() {
      return signInWithPopupSpy
    }

  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: UserService, useValue: spy},
        {provide: AngularFireAuth, useValue: afStub},
        {provide: Router, useValue: null}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#login should call signInWithPopup of AngularFireAuth and then pass user credentials to save method of userService', ()=>{
    service.login()
    expect(signInWithPopupSpy.then).toHaveBeenCalled();
    expect(spy.save).toHaveBeenCalledWith(mockUser);
  })
  // it('#save should not do anything is there no user object passed', ()=>{
  //   service.save(undefined)
    
  // })

});
