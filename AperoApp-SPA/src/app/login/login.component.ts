import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/edit-bikes']);
    });
  }

  cancel() {
    const previous = this.authService.getPreviousUrl();
    this.alertify.message('cancelled');

    if (previous && previous !== '/register') {
      this.router.navigateByUrl(previous);
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
