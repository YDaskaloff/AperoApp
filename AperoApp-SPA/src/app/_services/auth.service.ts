import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, filter, pairwise } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.adminUrl + 'auth/';
  private previousUrl: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  // private user: any;
  currentUser: User;
  username = new BehaviorSubject<string>('user');
  currentUsername = this.username.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
    });
  }

  changeUserName(username: string) {
    this.username.next(username);
  }

  getPreviousUrl() {
    return this.previousUrl;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.decodedToken = this.jwtHelper.decodeToken(res.token);
          this.currentUser = res.user;
          this.changeUserName(this.currentUser.username);
        }
      })
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin() {
    if (this.decodedToken.role === 'admin') {
      return true;
    }
    return false;
  }

  titlecase(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.baseUrl + id, user).pipe(
      map((response: any) => {
        const res = response;
        if (res) {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));
          this.currentUser = res;
          this.changeUserName(this.currentUser.username);
        }
      })
    );
  }
}
