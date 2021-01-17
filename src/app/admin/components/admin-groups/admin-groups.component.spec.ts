import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppUser } from 'src/app/shared/models/app-user';
import {
  mockAssignedQuiz,
  mockCategories,
  mockGroup,
  mockGroups,
  mockUser1,
  mockUser2,
} from 'src/app/shared/models/mockModels';
import { CategoryService } from 'src/app/shared/services/category.service';
import { GroupService } from 'src/app/shared/services/group.service';
import { UserService } from 'src/app/shared/services/user.service';

import { AdminGroupsComponent } from './admin-groups.component';

let routeStub = {
  snapshot: {
    queryParamMap: {
      get: (key: string) => { 
        switch (key) {
          case 'group': return mockGroupId;
          case 'category': return mockCat;
        }
      }
    }
  }
}

let mockGroupId = '11';
let mockCat = 'algebra';

describe('AdminGroupsComponent', () => {
  let component: AdminGroupsComponent;
  let fixture: ComponentFixture<AdminGroupsComponent>;
  let groupSpy = jasmine.createSpyObj('GroupService', ['getAll']);
  let catSpy = jasmine.createSpyObj('CategoryService', ['getAll']);
  let userSpy = jasmine.createSpyObj('UserService', ['getGroup', 'cancelQuiz', 'cancellAllQuizzes']);
  let getAllSpy = jasmine.createSpyObj('getAll', ['valueChanges'])
  //let getGroupSpy = jasmine.createSpyObj('getGroup', )
  groupSpy.getAll.and.returnValue(of(mockGroups));
  catSpy.getAll.and.returnValue(getAllSpy);
  getAllSpy.valueChanges.and.returnValue(of(mockCategories));
  userSpy.getGroup.and.returnValue(of(mockGroup));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGroupsComponent ],
      providers: [
        {provide: GroupService, useValue: groupSpy},
        {provide: CategoryService, useValue: catSpy},
        {provide: UserService, useValue: userSpy},
        {provide: ActivatedRoute, useValue: routeStub},
      ],
      imports: [
        FormsModule,
        RouterTestingModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the list of students, if group and category were passed in URL', () => {
    mockGroupId = '11';
    mockCat = 'algebra';
    fixture = TestBed.createComponent(AdminGroupsComponent);
    component = fixture.componentInstance;
    expect(component._group).toEqual('11');
    expect(component._category).toEqual('algebra');
    expect(component.students).toBeTruthy();
    expect(component.students).toEqual(mockGroup.map(u => new AppUser(u)));
  })

  it('should get the list of students, when load method is called', () => {
    component.load({group: '11'});
    expect(component.students).toBeTruthy();
    expect(component.students).toEqual(mockGroup.map(u => new AppUser(u)));
  })

  it('should call userService.cancelQuiz, when the cancel method is called', () => {
    component.cancel(mockUser1, mockAssignedQuiz);
    expect(userSpy.cancelQuiz).toHaveBeenCalledWith(mockUser1.userId, mockAssignedQuiz.quizKey);
  })

  it('should render list of groups', () => {
    let de = fixture.debugElement.query(By.css('#group'))
    let el: HTMLElement = de.nativeElement;
    expect(el.children[1].innerHTML).toEqual('9');
    expect(el.children[2].innerHTML).toEqual('10');       
    expect(el.children[3].innerHTML).toEqual('11');
  })

  it('should render list of categories', () => {
    let de = fixture.debugElement.query(By.css('#category'))
    let el: HTMLElement = de.nativeElement;
    expect(el.children[1].innerHTML).toEqual('algebra');
    expect(el.children[2].innerHTML).toEqual('geometry');       
    expect(el.children[3].innerHTML).toEqual('physics');
  })

  it('should call load method, when loadBtn is clicked', () => {
    let de = fixture.debugElement.query(By.css('#loadBtn'))
    let el: HTMLElement = de.nativeElement;
    component._group = '11';
    component._category = 'algebra';
    el.click();
    expect(component.students).toEqual(mockGroup.map(u => new AppUser(u)));
  })

  it('should have a link to /admin/groups/', () => {
    let des = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    let index = des.findIndex(de => de.nativeElement.getAttribute('href') === "/admin/groups/11/mockId1/algebra");
    expect(index).toBeGreaterThan(-1);
    //alternatively
    let href = fixture.debugElement.queryAll(By.css('a'))[1].nativeElement
      .getAttribute('href');
    expect(href).toEqual('/admin/groups/11/mockId1/algebra');
  })

  it('should render a name of the student', async(() => {
    fixture.whenStable().then(() => {
      let des = fixture.debugElement.queryAll(By.css('.studentName'));
      let el0: HTMLElement = des[0].nativeElement;
      let el1: HTMLElement = des[1].nativeElement;
      expect(el0.innerText).toContain('Mock User1')
      expect(el1.innerText).toContain('Mock User2')
    })
  }))

  it('should have a routerLink to assign quiz for each student', () => {
    let dess = fixture.debugElement.queryAll(By.css('.studentName'));
    let el0: HTMLElement = dess[0].nativeElement.querySelector('.float-right');
    let href0 = el0.getAttribute('href');
    let el1: HTMLElement = dess[1].nativeElement.querySelector('.float-right');
    let href1 = el1.getAttribute('href');
    expect(href0).toEqual('/admin/groups/11/mockId1/algebra')
    expect(href1).toEqual('/admin/groups/11/mockId2/algebra')
  })

  it('should render a list of assigned quizzes for each student', fakeAsync(() => {
    let debugElements = fixture.debugElement.queryAll(By.css('.assigned-quizzes'))
    let el0: HTMLElement = debugElements[0].nativeElement;
    let el1: HTMLElement = debugElements[1].nativeElement;
    expect(el0.innerText).toContain('quiz title');
    expect(el1.innerText).toContain('quiz title');
  }));

  it('should have a button to cancel the quiz of each student', ()=> {
    let de = fixture.debugElement.queryAll(By.css('.link'))[1]
    de.triggerEventHandler('click', null);
    expect(userSpy.cancelQuiz).toHaveBeenCalledWith(mockUser2.userId, mockAssignedQuiz.quizKey);
  })

  it('should render a list of submitted quizzes for each student', fakeAsync(() => {
    let debugElements = fixture.debugElement.queryAll(By.css('.submitted-quizzes'))
    let el0: HTMLElement = debugElements[0].nativeElement;
    let el1: HTMLElement = debugElements[1].nativeElement;
    expect(el0.innerText).toContain('Submitted quiz title');
    expect(el1.innerText).toContain('Submitted quiz title');
  }));

  it('should render a submitted quizzes with links to review/student.userId/quizKey', () => {
    let debugElements = fixture.debugElement.queryAll(By.css('.submitted-quizzes'));
    let el0: HTMLElement = debugElements[0].nativeElement.getElementsByTagName("a")[0];
    let href0 = el0.getAttribute('href');
    let el1: HTMLElement = debugElements[1].nativeElement.getElementsByTagName("a")[0];
    let href1 = el1.getAttribute('href');
    expect(href0).toEqual('/review/mockId1/quizId1');
    expect(href1).toEqual('/review/mockId2/quizId1');
  })

  it('should have a routerLink to reviewed quizzes of each student', () => {
    let des = fixture.debugElement.queryAll(By.css('.reviewed-quizzes'));
    let el0: HTMLElement = des[0].nativeElement;
    let href0 = el0.getAttribute('href');
    let el1: HTMLElement = des[1].nativeElement;
    let href1 = el1.getAttribute('href');
    expect(href0).toEqual('/admin/reviewed/mockId1');
    expect(href1).toEqual('/admin/reviewed/mockId2');
  })
    
});
