import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminQuizzesComponent } from './admin/admin-quizzes/admin-quizzes.component';
import { QuizFormComponent } from './quiz-form/quiz-form.component';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin/admin.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AdminGroupsComponent } from './admin-groups/admin-groups.component';
import { GroupComponent } from './group/group.component';
import { UploadFilesComponent } from './shared/upload-files/upload-files.component';
import { RegisterComponent } from './register/register.component';
import { ReviewQuizComponent } from './admin/review-quiz/review-quiz.component';
import { SolveQuizComponent } from './solveQuiz/solve-quiz.component';
import { ReviewedQuizzesComponent } from './admin/reviewed-quizzes/reviewed-quizzes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserProfileComponent,
    ReviewQuizComponent,
    SolveQuizComponent,
    AdminQuizzesComponent,
    QuizFormComponent,
    AdminComponent,
    BsNavbarComponent,
    AdminGroupsComponent,
    GroupComponent,
    UploadFilesComponent,
    RegisterComponent,
    ReviewQuizComponent,
    ReviewedQuizzesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule,
    NgbModule,
    NgxDatatableModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    FontAwesomeModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
