import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: User;
  username: string;
  previousUrl: string = this.authService.getPreviousUrl();
  editForm: FormGroup;
  emailPattern = '[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  formTemplate: {
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private alertify: AlertifyService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.createEditForm();

    this.passwordControlValueChanged();
    this.authService.currentUsername.subscribe(username => this.username = username);
    this.editForm.markAllAsTouched();
  }

  passwordControlValueChanged() {
    const confirmControl = this.editForm.get('confirmPassword');

    this.editForm.get('password').valueChanges.subscribe(
      (value: string) => {
        if (value !== '') {
          confirmControl.setValidators([Validators.required]);
        } else {
          confirmControl.clearValidators();
        }
      });
  }

  checkValid() {
    if (this.editForm.get('email').value === '' &&
        this.editForm.get('username').value === '' &&
        this.editForm.get('password').value === '' &&
        this.editForm.get('confirmPassword').value === '') {
      return false;
    } else {
      return true;
    }
  }

  createEditForm() {
    this.editForm = this.fb.group({
      email: ['', Validators.pattern(this.emailPattern)],
      username: [''],
      password: ['', [Validators.minLength(7), Validators.maxLength(16)]],
      confirmPassword: ['']
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  resetForm() {
    this.editForm.get('email').setValue('');
    this.editForm.get('username').setValue('');
    this.editForm.get('password').setValue('');
    this.editForm.get('confirmPassword').setValue('');
  }

  updateUser() {
    if (this.checkValid()) {
      this.alertify.confirm('Are you sure you want to do this?', () => {
        this.user = Object.assign({}, this.editForm.value);
        this.authService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(() => {
          this.alertify.success('Profile updated');
          this.resetForm();
          this.editForm.markAllAsTouched();
        }, error => {
          this.alertify.error(error);
        });
      });
    }
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
