import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from '../app-routing.module';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { EventService } from './services/event.service';
import { GroupService } from './services/group.service';
import { QuizService } from './services/quiz.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    UploadFilesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    NgxDatatableModule,
    AngularFireStorageModule,
    NgbModule,
    FontAwesomeModule,
  ],
  exports: [
    UploadFilesComponent,
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    NgxDatatableModule,
    AngularFireStorageModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [
    AuthGuard,
    AuthService,
    CategoryService,
    EventService,
    GroupService,
    QuizService,
    UploadService,
    UserService
  ]
})
export class SharedModule { }
