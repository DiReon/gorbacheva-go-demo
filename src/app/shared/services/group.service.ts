import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    let ref: AngularFireList<any> = this.db.list('/groups');
    return ref.valueChanges();
  }

  get(group) {
    return this.db.object('/groups' + group);
  }
  push(groupId: string, quiz: {dateTime: number, quizId: string, title: string}) {
    this.db.list('/groups/' + groupId + '/assignedQuizzes').push(quiz);
  }
}
