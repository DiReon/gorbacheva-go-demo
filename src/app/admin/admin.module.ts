import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminGroupsComponent } from './components/admin-groups/admin-groups.component';
import { AdminQuizzesComponent } from './components/admin-quizzes/admin-quizzes.component';
import { AdminComponent } from './components/admin/admin.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { ReviewQuizComponent } from './components/review-quiz/review-quiz.component';
import { ReviewedQuizzesComponent } from './components/reviewed-quizzes/reviewed-quizzes.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';



@NgModule({
  declarations: [
    ReviewQuizComponent,
    AdminQuizzesComponent,
    QuizFormComponent,
    AdminComponent,
    ReviewQuizComponent,
    ReviewedQuizzesComponent,
    AdminGroupsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [
    AdminAuthGuard,
  ]

})
export class AdminModule { }
