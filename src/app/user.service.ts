import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quiz} from './models/quiz';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listRef: AngularFireList<AppUser>;
  constructor(private db: AngularFireDatabase) { }

  save(user) {
    this.db.object('/users/' + user.uid).update({
      userId: user.uid,
      userName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
  }

  update(userId: string, user: AppUser) {
    console.log('Updating user: ');
    console.table(user);
    this.db.object('/users/' + userId).update(user)
  }

  submitQuiz(userId: string, quizzes: Quiz[]) {
    console.log('Submitting quiz:');
    console.table(quizzes);
    this.db.list(`/users/${userId}`).update('quizzes', quizzes)
  }

  delete(userId) {
    this.db.object('/users/' + userId).remove();
  }

  get(userId: string): AngularFireObject<AppUser> {
    console.log("called userService.get(", userId, ")");
    return this.db.object('/users/' + userId)
  }

  getAll() {
    this.listRef = this.db.list('/users');
    return this.listRef.valueChanges();
  }

  getGroup(group): Observable<AppUser[]> {
    this.listRef = this.db.list('/users', ref => ref.orderByChild('group').equalTo(group));
    return this.listRef.valueChanges();
  }

  assignQuizToGroup(group: string, quiz: Quiz) {
    console.log(`Assigning quiz ${quiz.title} to a group ${group}...`);
    
    this.getGroup(group).pipe(take(1)).subscribe(users => {
      users.forEach(s => {
        let time = new Date().getTime();
        let randomQuiz;
        let randomUrl = Math.floor(Math.random() * quiz.imageUrls.length);
        randomQuiz = {assignedTime: time, title: quiz.title, quizId: quiz.quizId, quizUrl: quiz.imageUrls[randomUrl] }
        console.log(`s.quizzes: ${s.quizzes}`);
        
        s.quizzes ? s.quizzes.push(randomQuiz) : s.quizzes = [randomQuiz];
        this.db.list('/users/' + s.userId).update('quizzes', s.quizzes)
    })
    })
  }

  cancelQuiz(userId, quizId) {
    this.db.object('/users/' + userId + 'quizzes' + quizId).remove();
  }

  cancelAllQuizzes(group) {
    this.getGroup(group).subscribe(users => {
      users.forEach(s => this.db.list('/users/' + s.userId + '/quizzes').remove())
    })
  }
}
