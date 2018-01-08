// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Entities Imports
import { Role } from '../../shared/entities/role/role';

// Services Imports
import { RoleService } from '../../shared/entities/role/role.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'nsm-web-roles-create',
  templateUrl: './roles-create.component.html',
  styleUrls: ['./roles-create.component.scss']
})
export class RolesCreateComponent implements OnDestroy, OnInit {

  private roleSubscription: Subscription = new Subscription();

  public nameControl: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(255)
  ]);
  public roleGroup: FormGroup = new FormGroup({
    name: this.nameControl
  });

  constructor(private rs: RoleService, private ro: Router) { }

  ngOnDestroy() {
    this.roleSubscription.unsubscribe();
  }

  ngOnInit() {
  }

  create(): void {
    if (this.roleGroup.valid) {
      const role: Role = new Role();
      role.hydrate(this.roleGroup.value);
      this.roleSubscription = this.rs.create(role).subscribe(res => {
        this.ro.navigate(['/administration/roles']);
      });
    }
  }

}
