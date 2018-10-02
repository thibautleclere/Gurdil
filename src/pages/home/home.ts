import { Component, OnInit, ViewChild } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { LoginPage} from '../login/login';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { Gurdil } from '../../services/gurdil';
import { GurdilPage } from '../gurdil/gurdil';
import { AuthProvider } from "../../providers/auth/auth";
import { Beer } from "../../services/beer";
import { SMS, SmsOptions } from "@ionic-native/sms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild('TimerCountdownComponent') timerComponent: TimerCountdownComponent;

  public nain: NainInterface;
  public liste: NainInterface[] = [];
  public beers: number = 0;

  public phones = ['0678971941', '0620142847', '0633224869', '0626033128'];
  public options: SmsOptions = {
      android: {
        intent: 'INTENT'
      }
  };

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public gurdil: Gurdil,
      private socialSharing: SMS,
      public authService: AuthProvider,
      public loadCtrl: LoadingController,
      public beerService: Beer) {

    this.gurdil.onEndCountDown.subscribe((start: boolean) => {
      console.log("event end countdown");
    });
    this.gurdil.onStartGurdil.subscribe((start: boolean) => {
      this.socialSharing.send(this.phones, `Test: Gurdil dans 10 minutes! ${this.beers} pour moi`, this.options);
      this.storage.set('beers', this.beers);
      this.navCtrl.setRoot(GurdilPage);
    });
    this.authService.onLogin.subscribe((login: boolean) => {
      const loading = this.loadCtrl.create({
         content: "Chargement des nains..."
      });
      loading.present();
      this.authService.loadUsers().then((ok: boolean) => {
        loading.dismiss();
      }, (error) => {
        console.log(error);
      })
    });
  }

  public ngOnInit() {
    this.storage.get('nain').then((nain) => this.nain = nain);
    this.storage.get('joueurs').then((liste) => this.liste = JSON.parse(liste));
  }

  public Login() {
    this.navCtrl.setRoot(LoginPage);
  }

  public addBeer() {
    this.beers++;
  }
  public delBeer() {
    this.beers--;
  }

}
