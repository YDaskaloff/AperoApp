import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  previousUrl: string = this.authService.getPreviousUrl();

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('registration successful');
      this.router.navigateByUrl('/home');
    }, error => {
      this.alertify.error(error);
    });
  }

  cancel() {
    const previous = this.authService.getPreviousUrl();
    this.alertify.message('cancelled');

    if (previous && previous !== '/login') {
      this.router.navigateByUrl(this.previousUrl);
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}
