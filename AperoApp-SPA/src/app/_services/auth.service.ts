import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, pairwise } from 'rxjs/operators';
import { Router, RoutesRecognized } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.adminUrl + 'auth/';
  private previousUrl: string;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  private user: any;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
      this.previousUrl = events[0].urlAfterRedirects;
    });
  }

  getPreviousUrl() {
    return this.previousUrl;
  }

  getCurrentUser() {
    return this.user;
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        this.user = response;
        if (this.user) {
          localStorage.setItem('token', this.user.token);
          this.decodedToken = this.jwtHelper.decodeToken(this.user.token);
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
}
