import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators'
import { auth } from 'firebase';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
    ) { this.user$ = afAuth.authState }
  
  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider).then(user => {
      if (user) {
        this.userService.save(user.user)
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl)
      }
    })
  }

  async loginByEmail(email: string, password: string) {
    var result = await this.afAuth.signInWithEmailAndPassword(email, password)
    let returnUrl = localStorage.getItem('returnUrl');
    this.router.navigateByUrl(returnUrl)
  }

  async register(email: string, password: string) {
    console.log(email, password);
    
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password).then(user =>{
      if (user) {
        this.userService.save(user.user)
      }
    })
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await (await this.afAuth.currentUser).sendEmailVerification();
    let returnUrl = localStorage.getItem('returnUrl');
    this.router.navigateByUrl(returnUrl)
  }
  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
  }
  
  logout() {
    this.afAuth.signOut();
    this.router.navigateByUrl('/');
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) return this.userService.get(user.uid).valueChanges()

        return of(null)
    }))
  }



}
