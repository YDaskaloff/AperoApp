import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, filter, pairwise } from 'rxjs/operators';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  private previousUrl: string;
  // registerMode = new BehaviorSubject<boolean>(false);
  // currentRegisterMode = this.registerMode.asObservable();
  // loginMode = new BehaviorSubject<boolean>(false);
  // currentLoginMode = this.loginMode.asObservable();

  constructor(private http: HttpClient, public router: Router) {
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
    });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }

  // changeRegisterMode(isIt: boolean) {
  //   if (isIt) {
  //     this.loginMode.next(false);
  //   }
  //   this.registerMode.next(isIt);
  // }

  // changeLoginMode(isIt: boolean) {
  //   if (isIt) {
  //     this.registerMode.next(false);
  //   }
  //   this.loginMode.next(isIt);
  // }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
