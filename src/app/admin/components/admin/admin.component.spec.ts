import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AppEvent } from 'src/app/shared/models/app-event';
import { AppUser } from 'src/app/shared/models/app-user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

import { AdminComponent } from './admin.component';

export class MockAuthService {
  get appUser$() {
    return of(mockUser);
  }
}

let mockUser: AppUser = {
  userName: 'Mock User',
  userId: 'mockId',
  email: 'mockEmail',
  photoUrl: 'mockUrl',
  group: null,
  quizzes: {},
  quizKeys: [],
  quizzesArr: [],
  isAdmin: true
}

let mockEvents: AppEvent[] = [
  {
    userName: 'Mock User 1',
    content: 'Mock content 1',
    time: 123123123
  },
  {
    userName: 'Mock User 2',
    content: 'Mock content 2',
    time: 123123124
  }
]

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let authService: AuthService;
  // let authSpy = jasmine.createSpyObj('AuthService', ['login'])
  let eventSpy = jasmine.createSpyObj('EventService', ['getAll'])
  eventSpy.getAll.and.returnValue(of(mockEvents));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: EventService, useValue: eventSpy}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get appUser$ from AuthService', () => {
    expect(authService.appUser$).toBeTruthy();
    authService.appUser$.subscribe(u => expect(u).toEqual(mockUser))
  })

  it('should call getAll method of EventService', ()=>{
    expect(eventSpy.getAll).toHaveBeenCalled();
  })

  it('should render user name', () => {
    let de = fixture.debugElement.query(By.css('.greeting'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain('Mock User');
  })

  it('should render list of events', () => {
    let de = fixture.debugElement.queryAll(By.css('.list-group-item'));
    let el: HTMLElement = de[0].nativeElement;
    expect(de.length).toEqual(2);
    expect(el.innerText).toContain('Mock User 1');
    expect(el.innerText).toContain('Mock content 1');
  })
});
