import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { AppEvent } from '../models/app-event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private db: AngularFireDatabase) { }

  recordEvent(userName, content) {
    let event: AppEvent;
    event = {
      time: new Date().getTime(),
      userName: userName,
      content: content
    }
    this.db.list('/events/').push(event)
  }

  getAll() {
    let listRef: AngularFireList<AppEvent> = this.db.list(`/events/`, ref => ref.orderByChild('time').limitToLast(30))
    return listRef.valueChanges().pipe(
      map(array => array.reverse())
    )
  }

}
