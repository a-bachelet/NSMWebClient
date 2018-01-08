// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Entities Imports
import { User } from '../../shared/entities/user/user';
import { Role } from '../../shared/entities/role/role';

// Services Imports
import { UserService } from '../../shared/entities/user/user.service';
import { RoleService } from '../../shared/entities/role/role.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'nsm-web-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnDestroy, OnInit {

  private userSubscription: Subscription = new Subscription();
  private rolesSubscription: Subscription = new Subscription();

  public user: User = null;
  public userSave: any = {};
  public roles: Role[] = [];

  public userGroup: FormGroup = null;
  public idControl: FormControl = null;
  public firstNameControl: FormControl = null;
  public lastNameControl: FormControl = null;
  public emailControl: FormControl = null;
  public roleControl: FormControl = null;
  public createdAtControl: FormControl = null;

  constructor(
    private ar: ActivatedRoute,
    private us: UserService,
    private ro: Router,
    private rs: RoleService
  ) { }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.rolesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userSubscription = this.us.getById(this.ar.params['value'].id).subscribe(user => {
      this.rolesSubscription = this.rs.getAll().subscribe(roles => {
        this.roles = roles;
        this.user = user;
        this.userSave = this.user.toSendRest();
        this.userSave.role = this.roles.find(r => r._id === this.user.role._id);
        this.initForm();
      });
    });
  }

  private initForm(): void {
    this.idControl = new FormControl(this.user._id);
    this.idControl.disable();
    this.firstNameControl = new FormControl(this.user.firstName, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255)
    ]);
    this.lastNameControl = new FormControl(this.user.lastName, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255)
    ]);
    this.emailControl = new FormControl(this.user.email, [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
      Validators.maxLength(255)
    ]);
    this.roleControl = new FormControl(this.roles.find(r => r._id === this.user.role._id), [
      Validators.required
    ]);
    this.createdAtControl = new FormControl(this.user.createdAt);
    this.createdAtControl.disable();
    this.userGroup = new FormGroup({
      _id: this.idControl,
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      email: this.emailControl,
      role: this.roleControl,
      createdAt: this.createdAtControl
    });
  }

  public isModified(): boolean {
    let modified = false;
    if (this.idControl.value !== this.userSave._id) {
      modified = true;
    }
    if (this.firstNameControl.value !== this.userSave.firstName) {
      modified = true;
    }
    if (this.lastNameControl.value !== this.userSave.lastName) {
      modified = true;
    }
    if (this.emailControl.value !== this.userSave.email) {
      modified = true;
    }
    if (this.roleControl.value._id !== this.userSave.role._id) {
      modified = true;
    }
    if (this.createdAtControl.value !== this.userSave.createdAt) {
      modified = true;
    }
    return modified;
  }

  public edit(): void {
    if (this.userGroup.valid) {
      const user: User = new User(this.user);
      user.hydrate(this.userGroup.value);
      this.userSubscription = this.us.update(user).subscribe(
        res => {
          this.user.hydrate(res);
          this.initForm();
          this.ro.navigate(['/administration/users']);
        }
      );
    }
  }

  public revert(): void {
    this.idControl.setValue(this.userSave._id);
    this.firstNameControl.setValue(this.userSave.firstName);
    this.lastNameControl.setValue(this.userSave.lastName);
    this.emailControl.setValue(this.userSave.email);
    this.roleControl.setValue(this.userSave.role);
    this.createdAtControl.setValue(this.userSave.createdAt);
    this.userGroup.updateValueAndValidity();
  }

}
