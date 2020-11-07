import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { UserProfileComponent } from './core/components/user-profile/user-profile.component';
import { QuizFormComponent } from './admin/components/quiz-form/quiz-form.component';
import { AdminQuizzesComponent } from './admin/components/admin-quizzes/admin-quizzes.component';
import { AuthGuard } from './shared/services/auth-guard.service';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminComponent } from './admin/components/admin/admin.component';
import { AdminGroupsComponent } from './admin/components/admin-groups/admin-groups.component';
import { RegisterComponent } from './core/components/register/register.component';
import { ReviewQuizComponent } from './admin/components/review-quiz/review-quiz.component';
import { SolveQuizComponent } from './student/components/solveQuiz/solve-quiz.component';
import { ReviewedQuizzesComponent } from './admin/components/reviewed-quizzes/reviewed-quizzes.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'quiz/:quizKey', component: SolveQuizComponent, canActivate: [AuthGuard]},

  {path: 'admin/quizzes/new', component: QuizFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/quizzes/:id', component: QuizFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/quizzes', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]},

  
  
  {path: 'admin/groups/:group/:studentId/:category', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/groups/:group/:category', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/groups', component: AdminGroupsComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/reviewed/:student', component: ReviewedQuizzesComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/:student/:quizKey', component: ReviewQuizComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
