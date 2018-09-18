import {Component, Input, OnInit, Injectable} from '@angular/core';
import { Gurdil } from '../../services/gurdil';
import { ITimer } from "./timer-countdown.interface";


@Component({
  selector: 'timercountdown',
  templateUrl: 'timer-countdown.html'
})
export class TimerCountdownComponent implements OnInit{

  public interval;
  public timeShown: ITimer = null;
  public startGurdil: string = "GURDIL!!!";
  public timeRunning: boolean = false;
  public timeStart: number;
  public afterGurdil: boolean = false;

  @Input()
  public typeTimer: string;

  @Input()
  public timeLeft: number = 10;

  constructor(public gurdilservice: Gurdil) {
  }

  public ngOnInit() {
      this.timeStart = this.timeLeft;
      this.timeShown = this.convertTimeToString(this.timeLeft);
  }

  public startCountDown() {
      this.timeRunning = true;
      if (this.timeShown && this.timeShown.end) {
          this.gurdilservice.emitGurdil();
      }
      this.gurdilservice.emit10minutes();
      this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
              this.timeLeft--;
              this.timeShown = this.convertTimeToString(this.timeLeft);
          } else {
              debugger;
              clearInterval(this.interval);
              this.timeShown.end = true;
              this.timeShown.begin = false;
              if (this.typeTimer === 'chrono' && !this.afterGurdil) {
                this.gurdilservice.emitEndGurdil();
              } else if (this.afterGurdil) {
                this.gurdilservice.emitEndAfterGurdil();
              } else {
                this.gurdilservice.emitEnd10minutes();
              }
          }
      },1000)

  }

  public pauseCountDown() {
      clearInterval(this.interval);
  }

  public convertTimeToString(time) : ITimer {

    let minutes = Math.floor(time / 60);
    let secondes = time % 60;
    return {'minutes': minutes, 'secondes': secondes, begin: true, end: false};

  }

  public reset() {
      clearInterval(this.interval);
      this.timeShown = this.convertTimeToString(this.timeStart);
  }

}
