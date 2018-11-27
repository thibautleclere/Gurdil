import { Component, Input, OnInit } from '@angular/core';
import { Gurdil } from '../../services/gurdil';
import { NainInterface } from '../../models/nain.interface';


@Component({
  selector: 'timercountdown',
  templateUrl: 'timer-countdown.html'
})
export class TimerCountdownComponent implements OnInit{

  public message_error: string;

  public readyGurdil: boolean;
  public showmessReady: boolean;

  @Input()
  public listePLayers: NainInterface[];

  @Input()
  public timeLeft: number = 10;

  constructor(public gurdilservice: Gurdil) {
  }

  public ngOnInit() {
      this.readyGurdil = false;
      this.showmessReady = false;
  }

  public startCountDown() {
      if (this.checkRunCountDown()) {
        if (this.readyGurdil) {
            this.gurdilservice.emitGurdil();
        } else {
            this.showmessReady = true;
            this.gurdilservice.emitEnd10minutes();
        }
        this.readyGurdil = true;
      }
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
      this.showmessReady = false;
  }

}
