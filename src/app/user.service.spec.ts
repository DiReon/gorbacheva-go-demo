import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFireAuth } from '@angular/fire/auth/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { of } from 'rxjs';

class afStub {
  update(user) {}
}

let mockUser = {
  name: "Mock User",
  userId: "mockID",
  email: "mock email",
  photoUrl: "mock photo url"
}

let mockFireUser = {
  displayName: "Mock User",
  uid: "mockID",
  email: "mock email",
  photoURL: "mock photo url"
}

let path = '/users'

describe('UserService', () => {
  let service: UserService;
  let afSpy = jasmine.createSpyObj('AngularFireDatabase', ['list', 'object']);
  let objectSpy = jasmine.createSpyObj('object', ['update', 'valueChanges']);
  afSpy.object.and.returnValue(objectSpy);
  objectSpy.valueChanges.and.returnValue(of(mockUser))

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        // {provide: AngularFireDatabase, useClass: afStub }
        {provide: AngularFireDatabase, useValue: afSpy }
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('#save should call update method of angularfiredatabase and pass user data', ()=>{
    service.save(mockFireUser)
    expect(afSpy.object).toHaveBeenCalledWith(path + '/' + mockFireUser.uid);
    expect(objectSpy.update).toHaveBeenCalledWith(mockUser)
  })
  it('#get should return user object from users list in Firebase', ()=>{
    service.get(mockFireUser.uid);
    expect(afSpy.object).toHaveBeenCalledWith(path + '/' + mockFireUser.uid);
    expect(objectSpy.valueChanges).toHaveBeenCalledTimes(1);
    expect(objectSpy.valueChanges).toEqual(of(mockUser))
  })
});
