import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // registerMode: boolean;
  // loginMode: boolean;

  constructor(public authService: AuthService) {}

  ngOnInit() {
  //   this.authService.registerMode.subscribe(registerMode => this.registerMode = registerMode);
  //   this.authService.loginMode.subscribe(loginMode => this.loginMode = loginMode);
  }
}
