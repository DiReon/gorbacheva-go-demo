import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Quiz } from 'src/app/shared/models/quiz';
import { CategoryService } from 'src/app/shared/services/category.service';
import { QuizService } from 'src/app/shared/services/quiz.service';

 
@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {
  quiz = {} as Quiz;
  quizId: string;
  categories$;
  uploadIsValid = true;
  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.quizId = this.route.snapshot.paramMap.get('id');
    if (this.quizId) this.quizService.get(this.quizId).valueChanges().pipe(take(1)).subscribe(
      t => console.log(this.quiz = t)
    );
    this.categories$ = this.categoryService.getAll().snapshotChanges();
  }

  ngOnInit(): void {
  }

  onUploadFiles(urls: string[]) {
    console.log(`Urls from onUploadFiles:`);
    console.table(urls);
    this.quiz.imageUrls = urls;
  }

  uploadValidTrigger(value: boolean) {
    console.log("Received ", value);
    
    this.uploadIsValid = value;
  }

  save(value) {
    console.log('Form data: ', value);
    this.quiz.title = value.title;
    this.quiz.category = value.category;
    this.quiz.timeLimit = (value.timeLimit ? value.timeLimit : 43200);
    if (this.quizId) this.quizService.update(this.quizId, this.quiz);
    else this.quizService.create(this.quiz);
    this.router.navigate(['/admin/quizzes']);
  }
  
  delete() {
    if (!confirm('Точно хотите удалить тест?')) return;
    
    this.quizService.delete(this.quizId, this.quiz.imageUrls);
    this.router.navigate(['/admin/quizzes']);
    
  }


}
