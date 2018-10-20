import {Component, Input, OnInit} from '@angular/core';
import {ITimer} from "../timer-countdown/timer-countdown.interface";
import {Gurdil} from "../../services/gurdil";
import {NavController} from "ionic-angular";
import {HomePage} from "../../pages/home/home";


@Component({
  selector: 'gurdil-timer',
  templateUrl: 'gurdil-timer.html'
})
export class GurdilTimerComponent implements OnInit {

  public interval;
  public timeShown: ITimer = null;
  public timeRunning: boolean = false;
  public timeStart: number;
  public afterGurdil: boolean = false;
  public gurdilFinished: boolean = false;


  @Input()
  public timeLeft: number = 10;
  @Input()
  public timeAfter: number = 20;

  constructor(
      public gurdilservice: Gurdil,
      public navCtrl: NavController) {
  }


  public ngOnInit() {
      this.timeShown = this.convertTimeToString(this.timeLeft);
      this.timeRunning = true;
      if (this.timeShown && this.timeShown.end) {
          this.gurdilservice.emitGurdil();
      }

      this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
              this.timeLeft--;
              this.timeShown = this.convertTimeToString(this.timeLeft);
          } else {
              this.reset();
              this.timeShown.end = true;
              this.timeShown.begin = false;
              this.gurdilservice.emitEndGurdil();
          }
      },1000)

  }

  public startAfter() {
    this.timeShown = this.convertTimeToString(this.timeAfter);

    this.interval = setInterval(() => {
        if(this.timeAfter > 0) {
            this.timeAfter--;
            this.timeShown = this.convertTimeToString(this.timeAfter);
        } else {
            this.reset();
            this.timeShown.end = true;
            this.gurdilservice.emitEndAfterGurdil();
        }
    },1000)
  }

  public reset(timeStart?: number): void {
      timeStart = timeStart || 0;
      clearInterval(this.interval);
      this.timeShown = this.convertTimeToString(timeStart);
  }


  public convertTimeToString(time) : ITimer {

      let minutes = Math.floor(time / 60);
      let secondes = time % 60;
      return {'minutes': minutes, 'secondes': secondes, begin: true, end: false};

  }

  public resetGurdil(): void {
      this.navCtrl.setRoot(HomePage);
  }

}
