import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AppUser } from './models/app-user';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Quiz} from './models/quiz';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  listRef: AngularFireList<AppUser>;
  constructor(
    private db: AngularFireDatabase,
    private eventService: EventService,
  ) { }

  save(user) {
    this.db.object('/users/' + user.uid).update({
      userId: user.uid,
      userName: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
    })
  this.eventService.recordEvent(user.displayName, `зарегистрировался`)
  }

  update(userId: string, user: AppUser) {
    console.log('Updating user: ');
    console.table(user);
    this.db.object('/users/' + userId).update(user)
    this.eventService.recordEvent(user.userName, `обновил данные`)
}

  submitQuiz(user: AppUser) {
    console.log('Submitting quiz:');
    console.table(user.quizzes);
    this.db.list(`/users/${user.userId}`).update('quizzes', user.quizzes);
    this.eventService.recordEvent(user.userName, `отправил на проверку задание "${user.quizzes[user.quizzes.length-1].title}"`)
  }

  reviewQuiz(user: AppUser) {
    this.db.list(`/users/${user.userId}`).update('quizzes', user.quizzes);
    this.eventService.recordEvent('', `проверено задание ${user.quizzes[user.quizzes.length-1].title}, которое отправил ${user.userName}"`)
  }

  delete(userId) {
    this.db.object('/users/' + userId).remove();
    this.eventService.recordEvent(userId, 'удален')
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
    this.eventService.recordEvent(group, `получил задание "${quiz.title}"`);
  }

  cancelQuiz(userId, quizId) {
    this.db.object('/users/' + userId + '/quizzes' + quizId).remove();
    this.eventService.recordEvent('', `Задание пользователя ${userId} отменено`)
  }

  cancelUserQuizzes(userId) {
    this.db.list('/users/' + userId + '/quizzes').remove();
    console.log(`Cancelled all quizzes of user ${userId}`);
    this.eventService.recordEvent('', 'Все задания отменены')
  }

  startQuiz(user: AppUser, quizId, quiz: Quiz) {
    this.db.object(`/users/${user.userId}/quizzes/${quizId}`).update(
      {
        isStarted: true,
        startTime: quiz.startTime
      }
    )
    //this.eventService.recordEvent(user.userName, `начал выполнять задание "${quiz.title}"`)
  }

  assignDemoQuizzes(userId) {
    this.db.object(`/users/${userId}`).update({
      quizzes: [
        {
          assignedTime: 1599998129433,
          quizId: 'M9dvE9abhCbuAUFZWwV',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%9B%D0%BE%D0%B3%D0%B0%D1%80%D0%B8%D1%84%D0%BC%D1%8B%2F1.PNG?alt=media&token=e005d4c3-0da1-465b-a2c5-735e625d5daf",
          title: 'Логарифмы',
          timeLimit: 40,
        },
        {
          assignedTime: 1599998129433,
          quizId: 'M9dvMNUDhPdw271pzdi',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B%20%D1%83%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%2F0.PNG?alt=media&token=4107e9f3-64c9-48c7-aa1c-56d23c02f5e1",
          title: 'Системы уравнений',
          timeLimit: 40,
        },
      ]
    })
    console.log(`Assigned demo quizzes for user ${userId}`);
    this.eventService.recordEvent('', `Выполнен вход в демоверсию под Учеником. Задания Ученика удалены и ему назначены задания Логарифмы и Системы уравнений`)
  }

  cancelAllQuizzes(group) {
    this.getGroup(group).subscribe(users => {
      users.forEach(s => this.db.list('/users/' + s.userId + '/quizzes').remove())
    })
    this.eventService.recordEvent('', `Все задания в ${group} классе отменены`)
  }
}
