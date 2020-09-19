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
    this.db.object('/users/' + userId + '/quizzes' + quizId).remove();
  }

  cancelUserQuizzes(userId) {
    this.db.list('/users/' + userId + '/quizzes').remove();
    console.log(`Cancelled all quizzes of user ${userId}`);
  }

  assignDemoQuizzes(userId) {
    this.db.object(`/users/${userId}`).update({
      quizzes: [
        {
          assignedTime: 1599998129433,
          quizId: 'M9dvE9abhCbuAUFZWwV',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%9B%D0%BE%D0%B3%D0%B0%D1%80%D0%B8%D1%84%D0%BC%D1%8B%2F1.PNG?alt=media&token=e005d4c3-0da1-465b-a2c5-735e625d5daf",
          title: 'Логарифмы'
        },
        {
          assignedTime: 1599998129433,
          quizId: 'M9dvMNUDhPdw271pzdi',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B%20%D1%83%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%2F0.PNG?alt=media&token=4107e9f3-64c9-48c7-aa1c-56d23c02f5e1",
          title: 'Системы уравнений'
        },
      ]
    })
    console.log(`Assigned demo quizzes for user ${userId}`);
    
  }

  cancelAllQuizzes(group) {
    this.getGroup(group).subscribe(users => {
      users.forEach(s => this.db.list('/users/' + s.userId + '/quizzes').remove())
    })
  }
}
