import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFireDatabase) { }

  private uploadTask: firebase.storage.UploadTask;
}
