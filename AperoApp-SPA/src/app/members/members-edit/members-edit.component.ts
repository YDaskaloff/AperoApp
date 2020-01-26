import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/_models/user';
import { RoleService } from 'src/app/_services/role.service';
import { Role } from 'src/app/_models/role';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-members-edit',
  templateUrl: './members-edit.component.html',
  styleUrls: ['./members-edit.component.css']
})
export class MembersEditComponent implements OnInit {
  @Input() roles: Role[];
  users: User[];
  model: any = {};

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    const currentUser = this.authService.decodedToken.unique_name;
    this.userService.getUsers().subscribe(
      (users: User[]) => {
        this.users = users.filter(x => x.username !== currentUser);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.roles = roles;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  changeRole() {
    this.model.username = this.model.username.toLowerCase();
    this.alertify.confirm('Think twice, cut once!', () => {
      this.userService.changeRole(this.model).subscribe(
        next => {
          this.alertify.success(this.authService.titlecase(this.model.username) + ' is now ' + this.model.role);
        },
        error => {
          this.alertify.error(this.authService.titlecase(error));
        },
        () => {
          this.router.navigate(['/members']);
          this.loadUsers();
        }
      );
    });
  }

  deleteUser(id: number) {
    this.alertify.confirm('Think twice, cut once!', () => {
      this.userService.deleteUser(id).subscribe(
        next => {
          this.alertify.warning('Member has been deleted');
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.router.navigate(['/members']);
          this.loadUsers();
        }
      );
    });
  }

  onRegistered(registered: boolean) {
    this.loadUsers();
  }
}
