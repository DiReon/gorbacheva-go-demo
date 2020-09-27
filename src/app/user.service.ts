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
      photoUrl: user.photoURL || null,
    })
  this.eventService.recordEvent(user.displayName, `зарегистрировался`)
  }

  updateUserProfile(userId: string, profileData) {
    console.log('Updating user: ');
    console.table(userId);
    this.db.object(`/users/${userId}`).update(profileData);
    this.eventService.recordEvent(profileData['userName'], `обновил свой профиль`);
  }

  submitQuiz(userId: string, quiz: Quiz, userName: string) {
    console.log('Submitting quiz:');
    console.table(quiz);
    this.db.object(`/users/${userId}/quizzes/${quiz.quizKey}`).update(quiz);
    this.eventService.recordEvent(userName, `отправил на проверку задание "${quiz.title}"`);
  }

  reviewQuiz(user: AppUser) {
    this.db.list(`/users/${user.userId}`).update('quizzes', user.quizzes);
    // this.eventService.recordEvent('', `проверено задание ${user.quizzes[user.quizzes.length-1].title}, которое отправил ${user.userName}"`)
  }

  toggleReviewed(studentId: string, quizKey: string, isReviewed) {
    this.db.object(`/users/${studentId}/quizzes/${quizKey}`).update({isReviewed: isReviewed})
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
    this.getGroup(group).pipe(take(1)).subscribe(students => {
      for (let s in students) {
        console.log(`Assigning quiz to student ${students[s].userName}`);
        
        this.assignQuiz(students[s].userId, quiz)
      }
    })
    this.eventService.recordEvent('', `Выдано задание на выполнение ${group} классу`)
  }

  assignQuiz(studentId: string, quiz: Quiz) {
    let time = new Date().getTime();
    let randomUrl = Math.floor(Math.random() * quiz.imageUrls.length);
    let randomQuiz = {
      assignedTime: time, 
      title: quiz.title, 
      quizId: quiz.quizId, 
      quizUrl: quiz.imageUrls[randomUrl], 
      category: quiz.category
    }
    this.db.list(`/users/${studentId}/quizzes`).push(randomQuiz);
  }

  cancelQuiz(userId, quizId) {
    this.db.object('/users/' + userId + '/quizzes' + quizId).remove();
    this.eventService.recordEvent('', `Задание пользователя ${userId} отменено`)
  }

  cancelUserQuizzes(userId) {
    this.db.list('/users/' + userId + '/quizzes').remove();
    console.log(`Cancelled all quizzes of user ${userId}`);
  }

  startQuiz(userId: string, quizId: string, startTime) {
    this.db.object(`/users/${userId}/quizzes/${quizId}`).update(
      {
        isStarted: true,
        startTime: startTime
      }
    )
  }

  assignDemoQuizzes(userId) {
    this.db.object(`/users/${userId}`).update({
      quizzes: {
        dummyId0: {
          assignedTime: 1599998129433,
          quizId: 'M9dvE9abhCbuAUFZWwV',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%9B%D0%BE%D0%B3%D0%B0%D1%80%D0%B8%D1%84%D0%BC%D1%8B%2F1.PNG?alt=media&token=e005d4c3-0da1-465b-a2c5-735e625d5daf",
          title: 'Логарифмы',
          timeLimit: 40,
          category: 'Алгебра'
        },
        dummyId1: {
          assignedTime: 1599998129433,
          quizId: 'M9dvMNUDhPdw271pzdi',
          quizUrl: "https://firebasestorage.googleapis.com/v0/b/gorbacheva-go.appspot.com/o/quizzes%2F%D0%90%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%2F%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B%20%D1%83%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9%2F0.PNG?alt=media&token=4107e9f3-64c9-48c7-aa1c-56d23c02f5e1",
          title: 'Системы уравнений',
          timeLimit: 40,
          category: 'Алгебра'
        },
      }
    })
    console.log(`Assigned demo quizzes for user ${userId}`);
    this.eventService.recordEvent('', `Выполнен вход в демоверсию под Учеником. Задания Ученика удалены и ему назначены задания Логарифмы и Системы уравнений`)
  }

  cancelAllQuizzes(group) {
    this.getGroup(group).subscribe(users => {
      users.forEach(s => this.cancelUserQuizzes(s.userId))
    })
    this.eventService.recordEvent('', `Все задания в ${group} классе отменены`)
  }
}
