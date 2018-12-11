import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user: Observable<firebase.User> = null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private zone: NgZone,
    private router: Router) {
    this.user = firebaseAuth.authState;
  }
  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.sendToken(email);
        this.zone.run(() => { this.router.navigate(['/admin']); });

        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log(err);
      });
  }
  logout() {
    this.firebaseAuth.auth.signOut().then(() => {
      localStorage.removeItem("user");
      this.zone.run(() => { this.router.navigate(['']); });
    });
  }
  isLoggednIn() {
    return this.getToken() !== null;
  }
  sendToken(token: string) {
    localStorage.setItem("user", token)
    console.log(localStorage.setItem("user", token));
  }
  getToken() {
    return localStorage.getItem("user")
  }
}
