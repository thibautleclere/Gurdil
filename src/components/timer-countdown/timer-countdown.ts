import { Component, Input, OnInit } from '@angular/core';
import { Gurdil } from '../../services/gurdil';
import { ITimer } from './timer-countdown.interface';
import { NainInterface } from '../../models/nain.interface';


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
  public message_error: string;

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
      if (this.checkRunCountDown()) {
          this.timeRunning = true;
          if (this.timeShown && this.timeShown.end) {
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
                      this.gurdilservice.emitEnd10minutes();
                  }
              }, 1000);
          }
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

  public checkRunCountDown(): boolean {
      if (!this.listePLayers || !this.listePLayers.length) {
          this.message_error = `Champion! Il faut des joueurs pour participé aux gurdil...AU MOINS TOI<br/> Va dans l'onglet <strong>PARAMETRES</strong> et ajoute les`;
          return false;
      }
      return true;
  }

  public remove(): void {
      this.message_error = '';
  }

}
