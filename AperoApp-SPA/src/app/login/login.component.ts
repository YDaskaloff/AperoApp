import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  previousUrl: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      console.log('Logged in successfully');
    }, error => {
      console.log('Failed to log in');
    });
  }

  cancel() {
    const previous = this.authService.getPreviousUrl();

    if (previous && previous !== '/register') {
      this.authService.router.navigateByUrl(previous);
    } else {
      this.authService.router.navigateByUrl('/home');
    }
  }

}
