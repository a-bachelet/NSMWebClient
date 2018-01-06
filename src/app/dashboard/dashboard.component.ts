// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';

// SocketIo Imports
import * as io from 'socket.io-client';

// Services Imports
import { SystemService } from '../shared/services/system.service';

// Rxjs Imports
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'nsm-web-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {

  private secondsInterval = null;
  private commonSubscription: Subscription = new Subscription();

  public uptime: number = null;
  public common: any = null;

  constructor(
    private ss: SystemService
  ) { }

  ngOnDestroy() {
    this.commonSubscription.unsubscribe();
    clearInterval(this.secondsInterval);
  }

  ngOnInit() {
    this.commonSubscription = this.ss.getCommon().subscribe(common => {
      this.uptime = common.uptime;
      common.uptime = {
        days:  Math.floor(this.uptime / 86400),
        hours: Math.floor((this.uptime % 86400) / 3600),
        minutes: Math.floor(((this.uptime % 86400) % 3600) / 60),
        seconds: Math.floor(((this.uptime % 86400) % 3600) % 60)
      };
      this.common = common;
      this.secondsInterval = setInterval(() => {
        this.uptime++;
        this.common.uptime = {
          days:  Math.floor(this.uptime / 86400),
          hours: Math.floor((this.uptime % 86400) / 3600),
          minutes: Math.floor(((this.uptime % 86400) % 3600) / 60),
          seconds: Math.floor(((this.uptime % 86400) % 3600) % 60)
        };
      }, 1000);
    });
  }

}
