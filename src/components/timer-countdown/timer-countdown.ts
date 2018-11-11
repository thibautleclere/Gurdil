import {Component, Input, OnInit, Injectable} from '@angular/core';
import { Gurdil } from '../../services/gurdil';
import { ITimer } from "./timer-countdown.interface";
import {NainInterface} from "../../models/nain.interface";


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
  public listePLayers: NainInterface[];

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
          console.log('gurdil lancer');
          this.gurdilservice.emitGurdil();
      } else {
          this.gurdilservice.emit10minutes();
          this.interval = setInterval(() => {
              if (this.timeLeft > 0) {
                  this.timeLeft--;
                  this.timeShown = this.convertTimeToString(this.timeLeft);
              } else {
                  this.reset();
                  this.timeShown.end = true;
                  console.log('fin compte a rebour');
                  this.gurdilservice.emitEnd10minutes();
              }
          }, 1000);
      }

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
