import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

let mockUser = {name: "Mock User", id: "mockID"}

class mockAuthService {
  get appUser$ () {
    return of(mockUser)
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let spy = jasmine.createSpyObj('AuthService', ['appUser$'])
  // spy.appUser$.and.returnValue(of(mockUser))
  let routerStub = {
    navigate(params) {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [
        {provide: AuthService, useClass: mockAuthService},
        {provide: Router, useValue: routerStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(routerStub, 'navigate')

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide user object, if it exists', ()=>{
    fixture.detectChanges();
    expect(component.appUser).toEqual(mockUser)
  })
  
  it('should navigate user to the login page if user does not exists', ()=>{
    // let navigateSpy = spyOn(RouterStub, 'navigate');
    mockUser = null;
    component.ngOnInit();
    fixture.detectChanges();
    expect(routerStub.navigate).toHaveBeenCalledWith(['/login'])
  })
  it('should render username if user is identified', ()=>{
    component.ngOnInit();
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.greeting'));
    let el: HTMLElement = de.nativeElement;
    expect(el.innerText).toContain(mockUser.name);
  })
  
});
