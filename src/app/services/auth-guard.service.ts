import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.authService.getIsAuthFromFirebase()
        .then((isAuth) => {
          if (!isAuth) {
            this.router.navigate(['/connect'])
          }
          resolve(isAuth)
        })
        .catch((error) => {
          reject(false)
        })
    })

  }
}
