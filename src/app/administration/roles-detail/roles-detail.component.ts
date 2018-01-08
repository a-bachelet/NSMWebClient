// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Entities Imports
import { Role } from '../../shared/entities/role/role';

// Services Imports
import { RoleService } from '../../shared/entities/role/role.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'nsm-web-roles-detail',
  templateUrl: './roles-detail.component.html',
  styleUrls: ['./roles-detail.component.scss']
})
export class RolesDetailComponent implements OnDestroy, OnInit {

  private roleSubscription: Subscription = new Subscription();

  public role: Role = null;
  public roleSave: any = {};

  public roleGroup: FormGroup = null;
  public idControl: FormControl = null;
  public nameControl: FormControl = null;
  public createdAtControl: FormControl = null;

  constructor(private ar: ActivatedRoute, private rs: RoleService, private ro: Router) { }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
  }

  ngOnInit() {
    this.roleSubscription = this.rs.getById(this.ar.params['value'].id).subscribe(res => {
      this.role = res;
      this.roleSave = this.role.toSendRest();
      this.initForm();
    });
  }

  private initForm(): void {
    this.idControl = new FormControl(this.role._id);
    this.idControl.disable();
    this.nameControl = new FormControl(this.role.name, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255)
    ]);
    this.createdAtControl = new FormControl(this.role.createdAt);
    this.createdAtControl.disable();
    this.roleGroup = new FormGroup({
      _id: this.idControl,
      name: this.nameControl,
      createdAt: this.createdAtControl
    });
  }

  public isModified(): boolean {
    let modified = false;
    if (this.idControl.value !== this.roleSave._id) {
      modified = true;
    }
    if (this.nameControl.value !== this.roleSave.name) {
      modified = true;
    }
    if (this.createdAtControl.value !== this.roleSave.createdAt) {
      modified = true;
    }
    return modified;
  }

  public edit(): void {
    if (this.roleGroup.valid) {
      const role: Role = new Role(this.role);
      role.hydrate(this.roleGroup.value);
      this.roleSubscription = this.rs.update(role).subscribe(
        res => {
          this.role.hydrate(res);
          this.initForm();
          this.ro.navigate(['/administration/roles']);
        }
      );
    }
  }

  public revert(): void {
    this.idControl.setValue(this.roleSave._id);
    this.nameControl.setValue(this.roleSave.name);
    this.createdAtControl.setValue(this.roleSave.createdAt);
    this.roleGroup.updateValueAndValidity();
  }

}
