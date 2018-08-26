import { Component } from '@angular/core';
import { Gurdil } from '../../services/gurdil';


@Component({
  selector: 'gurdil-10-min',
  templateUrl: 'timer-countdown.html'
})
export class TimerCountdownComponent {

  public timeLeft: number = 600;//10 minutes
  public interval;
  public timeShown: string = "Gurdil dans 10 minutes!";
  public startGurdil: string = "GURDIL!!!";

  constructor(public gurdilservice: Gurdil) {

  }

  startCountDown() {
      this.gurdilservice.emit10minutes();
      this.interval = setInterval(() => {
          if(this.timeLeft > 0) {
              this.timeLeft--;
              this.timeShown = this.convertTimeToString(this.timeLeft);
          } else {
              //todo emit event gurdil ready!
              this.timeShown = this.startGurdil;
              this.gurdilservice.emitEnd10minutes();
          }
      },1000)

  }

  pauseCountDown() {
      clearInterval(this.interval);
  }

  convertTimeToString(time) {

    let minutes = Math.floor(time / 60);
    let secondes = time % 60;
    return minutes + " min " + secondes + " s ";

  }

}
