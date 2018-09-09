import { Injectable } from '@angular/core';
import * as firebase from 'firebase'
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth: boolean
  public isAuthSubject: Subject<boolean>
  constructor() {
    this.isAuthSubject = new Subject()
  }

  emitIsAuth() {
    this.isAuthSubject.next(this.isAuth)
  }

  getIsAuthFromFirebase(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.isAuth = true
            this.emitIsAuth()
            resolve(true)
          } else {
            this.isAuth = false
            this.emitIsAuth()
            resolve(false)
          }
        }
      )
    })
  }

  async connect(email: string, password: string) {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      this.isAuth = true
      this.emitIsAuth()
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }
  }

  async register(email: string, password: string) {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      this.isAuth = true
      this.emitIsAuth()
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }
  }

  async disconnect() {
    try {
      await firebase.auth().signOut()
      this.isAuth = false
      this.emitIsAuth()
    } catch (e) {
      const error = e as firebase.FirebaseError
      throw error.message
    }

  }
}
