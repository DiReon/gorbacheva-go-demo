import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Quiz } from './models/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  listRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) { }

  getAll() {
    this.listRef = this.db.list('/quizzes')
    return this.listRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));
  }

  get(quizId: string): AngularFireObject<Quiz> {
    return this.db.object('/quizzes/' + quizId);
  }

  create(quiz) {
    this.db.list('/quizzes').push(quiz);
  }

  update(quizId, quiz) {
    this.db.object('/quizzes/' + quizId).update(quiz);
  }

  delete(quizId) {
    this.db.list('/quizzes/' + quizId).remove();
  }
}
