// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';

// Angular Material Imports
import { MatTableDataSource } from '@angular/material';

// Entities Imports
import { Role } from '../../shared/entities/role/role';

// Servicies Imports
import { RoleService } from '../../shared/entities/role/role.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'nsm-web-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent implements OnDestroy, OnInit {

  private rolesSubscription = new Subscription();

  public dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  public displayedColumns: string[] = [ '_id', 'name', 'createdAt', 'actions' ];

  constructor(private rs: RoleService) { }

  ngOnDestroy() {
    this.rolesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.rolesSubscription = this.rs.getAll().subscribe(res => { this.dataSource = new MatTableDataSource<Role>(res); });
  }

}
