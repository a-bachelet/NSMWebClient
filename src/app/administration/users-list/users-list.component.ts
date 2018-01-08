// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';

// Angular Material Imports
import { MatTableDataSource } from '@angular/material';

// Entities Imports
import { User } from '../../shared/entities/user/user';

// Servicies Imports
import { UserService } from '../../shared/entities/user/user.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';
import {Role} from '../../shared/entities/role/role';

@Component({
  selector: 'nsm-web-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnDestroy, OnInit {

  private usersSubscription: Subscription = new Subscription();
  private removeSubscription: Subscription = new Subscription();

  public dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  public displayedColumns: string[] = [ '_id', 'lastName', 'firstName', 'createdAt', 'actions' ];

  constructor(private us: UserService) { }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
    this.removeSubscription.unsubscribe();
  }

  ngOnInit() {
    this.usersSubscription = this.us.getAll().subscribe(res => { this.dataSource = new MatTableDataSource<User>(res); });
  }

  public remove(id: string): void {
    const user: User = new User();
    user._id = id;
    this.removeSubscription = this.us.remove(user).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(obj => obj._id !== user._id);
    } );

  }

}
