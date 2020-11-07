import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SolveQuizComponent } from './components/solveQuiz/solve-quiz.component';



@NgModule({
  declarations: [
    SolveQuizComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class StudentModule { }
