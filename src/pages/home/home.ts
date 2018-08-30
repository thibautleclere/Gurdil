import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import {LoadingController, NavController} from 'ionic-angular';
import { LoginPage} from '../login/login';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { MenuComponent } from '../../components/menu/menu';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { Gurdil } from '../../services/gurdil';
import { GurdilPage } from '../gurdil/gurdil';
import {AuthProvider} from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild('menu') menuComponent: MenuComponent;
  @ViewChild('menu') timerComponent: TimerCountdownComponent;

  public nain: NainInterface;
  public liste: NainInterface[] = [];
  public beers: number = 0;

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public gurdil: Gurdil,
      private socialSharing: SocialSharing,
      public authService: AuthProvider,
      public loadCtrl: LoadingController) {

    this.gurdil.onEndCountDown.subscribe((start: boolean) => {
      console.log("event end countdown");
    });
    this.gurdil.onStartGurdil.subscribe((start: boolean) => {
      this.navCtrl.setRoot(GurdilPage);
    });
    this.authService.onLogin.subscribe((login: boolean) => {
      const loading = this.loadCtrl.create({
         content: "Chargement des nains..."
      });
      loading.present();
      this.authService.loadUsers().then((ok: boolean) => {
        debugger;
        loading.dismiss();
      }, (error) => {
        console.log(error);
      })
    });
  }

  ngOnInit() {
    this.storage.get('nain').then((nain) => this.nain = nain);
    this.storage.get('gurdiliens').then((liste) => this.liste = liste);
  }

  Login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
