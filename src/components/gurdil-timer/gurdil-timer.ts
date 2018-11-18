import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ITimer } from '../timer-countdown/timer-countdown.interface';
import { Gurdil } from '../../services/gurdil';
import { NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import {SMS, SmsOptions} from '@ionic-native/sms';
import { Storage } from '@ionic/storage';
import { NainInterface } from '../../models/nain.interface';
import { Game } from '../../services/game';
import { GurdilAudio } from '../../services/gurdil.audio';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { ScoreInterface } from '../../models/score.interface';


@Component({
  selector: 'gurdil-timer',
  templateUrl: 'gurdil-timer.html'
})
export class GurdilTimerComponent implements OnInit, AfterViewInit {

  public interval;
  public timeShown: ITimer = null;
  public timeRunning: boolean = false;
  public timeStart: number;
  public afterGurdil: boolean = false;
  public gurdilFinished: boolean = false;
  public scores: AngularFireList<ScoreInterface>;


  @Input()
  public timeLeft: number = 10;
  @Input()
  public timeAfter: number = 10;
  @Input()
  public srcAudio: string = '';

  public options: SmsOptions = {
    android: {
        intent: 'INTENT'
    }
  };

  constructor(
      public gurdilservice: Gurdil,
      public navCtrl: NavController,
      public smsService: SMS,
      public storage: Storage,
      public game: Game,
      public audio: GurdilAudio,
      public afDatabase: AngularFireDatabase) {
      this.scores = this.afDatabase.list('/parties');

  }

  public ngAfterViewInit() {
      this.timeRunning = true;
      if (this.timeShown && this.timeShown.end) {
          this.gurdilservice.emitGurdil();
      }

      this.audio.playAudio(this.srcAudio);
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

  public ngOnInit() {
      this.timeShown = this.convertTimeToString(this.timeLeft);
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
      this.storage.get('joueurs').then((listes) => {
         const joueurs = JSON.parse(listes);
         const phones = [];
         joueurs.forEach((joueur: NainInterface) => {
             if (joueur.phone)
                phones.push(joueur.phone);
         });
         this.game.getGameResume().then((resume: string) => {
             this.smsService.send(phones, resume, this.options);
             this.game.saveGameToBDD().then((score: ScoreInterface) => {
                 this.scores.push(score);
                 this.game.removeGame();
                 this.navCtrl.setRoot(HomePage);
             });
         });
      });
  }

}
