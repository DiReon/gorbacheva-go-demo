import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { mockQuiz0, mockQuiz1, mockQuiz2, mockQuiz3, mockQuiz4 } from 'src/app/shared/models/mockModels';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { UserService } from 'src/app/shared/services/user.service';

import { AdminQuizzesComponent } from './admin-quizzes.component';

let activatedRouteStub = {
  snapshot: {
    params: {
      group: '11',
      category: 'algebra',
      studentId: 'studentId'
    }
  }
}

let routerStub = {
  navigate(commands: any, extras?: any) {
  }
}

describe('AdminQuizesComponent', () => {
  let component: AdminQuizzesComponent;
  let fixture: ComponentFixture<AdminQuizzesComponent>;
  let userSpy = jasmine.createSpyObj('UserService', ['assignQuiz', 'assignQuizToGroup']);
  let quizSpy = jasmine.createSpyObj('QuizService', ['getQuizzesForCategory', 'getAll']);
  quizSpy.getQuizzesForCategory.and.returnValue(of([mockQuiz0, mockQuiz2, mockQuiz3, mockQuiz4]));
  quizSpy.getAll.and.returnValue(of([mockQuiz0, mockQuiz1, mockQuiz2, mockQuiz3, mockQuiz4]));
  userSpy.assignQuizToGroup.and.returnValue(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuizzesComponent ],
      providers: [
        {provide: UserService, useValue: userSpy},
        {provide: QuizService, useValue: quizSpy},
        {provide: Router, useValue: routerStub},
        {provide: ActivatedRoute, useValue: activatedRouteStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get quizzes for category from URL', fakeAsync(() => {
    fixture = TestBed.createComponent(AdminQuizzesComponent);
    component = fixture.componentInstance;
    tick();
    expect(component.category).toEqual('algebra');
    expect(component.group).toEqual('11');
    expect(component.studentId).toEqual('studentId')
    expect(component.rows).toEqual([mockQuiz0, mockQuiz2, mockQuiz3, mockQuiz4]);
  }))

  it('should filter the list of quizzes by the query', () => {
    let query = 'log';
    component.filter(query);
    expect(component.rows).toEqual([mockQuiz0, mockQuiz3]);
  })

  it('should return original list if no query', () => {
    let query = undefined;
    component.filter(query);
    expect(component.rows).toEqual([mockQuiz0, mockQuiz2, mockQuiz3, mockQuiz4]);
  })

  it('should call userService.assignQuizToGroup, if studentId not passed in URL', () => {
    component.studentId = undefined;
    component.rows.map(q => q['key'] = q.quizId);
    component.assignQuiz('quizId4');
    expect(userSpy.assignQuizToGroup).toHaveBeenCalledWith('11', mockQuiz4);
  })

  it('should call userService.assignQuiz, if studentId was passed in URL', () => {
    component.studentId = 'studentId';
    component.rows.map(q => q['key'] = q.quizId);
    component.assignQuiz('quizId4');
    expect(userSpy.assignQuiz).toHaveBeenCalledWith('studentId', mockQuiz4);
  })

  it('should redirect user to /admin/groups after quiz is assigned', () => {
    let spy = spyOn(routerStub, 'navigate');
    component.studentId = 'studentId';
    component.rows.map(q => q['key'] = q.quizId);
    component.assignQuiz('quizId4');
    expect(spy).toHaveBeenCalledWith([ '/admin/groups/' ], { queryParams: { group: '11', category: 'algebra' } });
  })

});
