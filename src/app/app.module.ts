import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { StudentModule } from './student/student.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AdminModule,
    SharedModule,
    CoreModule,
    StudentModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
