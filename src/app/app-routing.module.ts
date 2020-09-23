import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { AdminQuizzesComponent } from './admin/admin-quizzes/admin-quizzes.component';
import { AuthGuard } from './auth-guard.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { GroupComponent } from './group/group.component';
import { RegisterComponent } from './register/register.component';
import { ReviewQuizComponent } from './admin/review-quiz/review-quiz.component';
import { SolveQuizComponent } from './solveQuiz/solve-quiz.component';
import { ReviewedQuizzesComponent } from './admin/reviewed-quizzes/reviewed-quizzes.component';


const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
  {path: 'quiz/:quizKey', component: SolveQuizComponent, canActivate: [AuthGuard]},

  {path: 'admin/quizzes/new', component: QuizFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/quizzes/:id', component: QuizFormComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/quizzes', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]},

  
  
  {path: 'admin/groups/:group/quizzes', component: AdminQuizzesComponent, canActivate: [AdminAuthGuard]},
  {path: 'admin/groups/:id', component: GroupComponent, canActivate: [AdminAuthGuard]},
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
