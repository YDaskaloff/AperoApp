import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  baseUrl = environment.adminUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'members');
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  changeRole(model: any) {
    return this.http.post(this.baseUrl + 'changerole', model);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + 'members/' + id);
  }
}
