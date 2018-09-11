import { Component } from '@angular/core';
import { Gurdil } from '../../services/gurdil';
import { ITimer } from "./timer-countdown.interface";


@Component({
  selector: 'timercountdown',
  templateUrl: 'timer-countdown.html'
})
export class TimerCountdownComponent {

  public timeLeft: number = 10;
  public interval;
  public timeShown: ITimer = null;
  public startGurdil: string = "GURDIL!!!";
  public typeTimer: string = 'gurdilBtn';

  constructor(public gurdilservice: Gurdil) {

  }

  public startCountDown() {
      if (this.timeShown && this.timeShown.end) {
          this.gurdilservice.emitGurdil();
      }
      this.gurdilservice.emit10minutes();
      this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
              this.timeLeft--;
              this.timeShown = this.convertTimeToString(this.timeLeft);
          } else {
              clearInterval(this.interval);
              this.timeShown.end = true;
              this.timeShown.begin = false;
              this.gurdilservice.emitEnd10minutes();
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

  public setTimeLeft(seconds: number) {
      this.timeLeft = seconds;
  }
  public setTypeTimer(typeTimer) {
      this.typeTimer = typeTimer;
  }

}
