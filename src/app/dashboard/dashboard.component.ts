// Angular Imports
import { Component, OnDestroy, OnInit } from '@angular/core';

// SocketIo Imports
import * as io from 'socket.io-client';

// ChartJs Imports
import { Chart } from 'chart.js';

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

  private socket: any = null;
  private secondsInterval = null;
  private commonSubscription: Subscription = new Subscription();
  private cpusSubscription: Subscription = new Subscription();
  private disksSubscription: Subscription = new Subscription();
  private networksSubscription = new Subscription();

  public uptime: number = null;
  public common: any = null;
  public memory: any = {};
  public cpus: any = null;
  public disks: any = null;
  public networks: any = null;

  public memoryChart: Chart = null;
  public cpuChart: Chart = null;

  public memoryLabels: string[] = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', ''
  ];
  public memoryData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  public cpuLabels: string[] = [
    '', '', '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '', '', ''
  ];
  public cpuSysData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  public cpuUserData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];
  public cpuIdleData: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ];

  constructor(
    private ss: SystemService
  ) { }

  ngOnDestroy() {
    this.commonSubscription.unsubscribe();
    clearInterval(this.secondsInterval);
    this.socket.emit('stopMemory');
    this.socket.emit('stopCpu');
  }

  ngOnInit() {
    this.socket = io('http://localhost:3000');
    this.loadCommon();
    this.loadMemory();
    this.loadCpu();
    this.loadCpus();
    this.loadDisks();
    this.loadNetworks();
  }

  private loadCommon(): void {
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

  private loadMemory(): void {
    this.memoryChart = new Chart('memoryChart', {
      type: 'line',
      data: {
        labels: this.memoryLabels,
        datasets: [{
          label: 'Memory Usage',
          data: this.memoryData,
          borderColor: '#0063B1',
          fill: false
        }]
      },
      options: {
        animation: {
          duration: 0
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100
            }
          }]
        }
      }
    });
    this.socket.emit('memory');
    this.socket.on('memory', (res) => {
      const freeMem = res.freeMem;
      const totalMem = res.totalMem;
      const usedMem = totalMem - freeMem;
      this.memory['freeMem'] = Math.round(freeMem / 1024 / 1024 / 1024);
      this.memory['totalMem'] = Math.round(totalMem / 1024 / 1024 / 1024);
      this.memory['usedMem'] = Math.round(usedMem / 1024 / 1024 / 1024);
      const percentage = Math.round(usedMem * 100 / totalMem);
      this.memoryData.push(percentage);
      this.memoryChart.update();
      this.memoryData.shift();
      this.memoryChart.update();
    });
  }

  private loadCpu(): void {
    this.cpuChart = new Chart('cpuChart', {
      type: 'line',
      data: {
        labels: this.cpuLabels,
        datasets: [
          {
            label: 'Cpu Sys. Usage',
            data: this.cpuSysData,
            borderColor: '#DA3B01',
            fill: false
          },
          {
            label: 'Cpu User Usage',
            data: this.cpuUserData,
            borderColor: '#881798',
            fill: false
          },
          {
            label: 'Cpu Idle',
            data: this.cpuIdleData,
            borderColor: '#00CC6A',
            fill: false
          }
        ]
      },
      options: {
        animation: {
          duration: 0
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100
            }
          }]
        }
      }
    });
    this.socket.emit('cpu');
    this.socket.on('cpu', (res) => {
      const sys = res.cpu.sys;
      const user = res.cpu.user;
      const idle = res.cpu.idle;

      this.cpuSysData.push(sys);
      this.cpuSysData.shift();
      this.cpuChart.update();

      this.cpuUserData.push(user);
      this.cpuUserData.shift();
      this.cpuChart.update();

      this.cpuIdleData.push(idle);
      this.cpuIdleData.shift();
      this.cpuChart.update();
    });
  }

  private loadCpus(): void {
    this.cpusSubscription = this.ss.getCpus().subscribe(res => this.cpus = res.cpus);
  }

  private loadDisks(): void {
    this.disksSubscription = this.ss.getDisks().subscribe(res => {
      res.disks.forEach(disk => {
        disk.size = Math.round(disk.size / 1024 / 1024 / 1024);
      });
      this.disks = res.disks;
    });
  }

  private loadNetworks(): void {
    this.networksSubscription = this.ss.getNetworks().subscribe(res => this.networks = res.networks);
  }

}
