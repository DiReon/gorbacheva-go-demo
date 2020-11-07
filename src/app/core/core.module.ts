import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    BsNavbarComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
