import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewedQuizzesComponent } from './reviewed-quizzes.component';

xdescribe('ReviewedQuizzesComponent', () => {
  let component: ReviewedQuizzesComponent;
  let fixture: ComponentFixture<ReviewedQuizzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewedQuizzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewedQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
