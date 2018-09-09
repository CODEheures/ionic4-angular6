import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase'

import {Platform, ToastController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public isAuth: boolean
  public isAuthSubscription: Subscription

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const config = {
        apiKey: 'AIzaSyDHMQbKeWf860F6jmyzGpM41zIKMV8gyNc',
        authDomain: 'testbdd-658f3.firebaseapp.com',
        databaseURL: 'https://testbdd-658f3.firebaseio.com',
        projectId: 'testbdd-658f3',
        storageBucket: 'testbdd-658f3.appspot.com',
        messagingSenderId: '582003278916'
      };
      firebase.initializeApp(config);
      this.authService.getIsAuthFromFirebase()
    });
  }

  ngOnInit() {
    this.isAuthSubscription = this.authService.isAuthSubject.subscribe((isAuth) => {
      this.isAuth = isAuth
    })
  }

  ngOnDestroy() {
    this.isAuthSubscription.unsubscribe()
  }

  async disconnect() {
    try {
      await this.authService.disconnect()
      this.router.navigate(['/connect'])
      const toast = await this.toastCtrl.create({
        message: 'Vous êtes bien déconnecté',
        position: 'bottom',
        duration: 4000
      })
      return await toast.present()
    } catch (error) {
      const toast = await this.toastCtrl.create({
        message: error,
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: 'Fermer'
      })
      return await toast.present()
    }

  }
}
