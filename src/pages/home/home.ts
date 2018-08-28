import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NavController } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { MenuComponent } from '../../components/menu/menu';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { Gurdil } from '../../services/gurdil';
import { GurdilPage } from '../gurdil/gurdil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild('menu') menuComponent: MenuComponent;
  @ViewChild('menu') timerComponent: TimerCountdownComponent;

  public nain: NainInterface;
  public beers: number = 0;

  constructor(public navCtrl: NavController, public storage: Storage, public gurdil: Gurdil, private socialSharing: SocialSharing) {
    this.gurdil.onEndCountDown.subscribe((start: boolean) => {
      console.log("event end countdown");
    });
    this.gurdil.onStartGurdil.subscribe((start: boolean) => {
      this.navCtrl.setRoot(GurdilPage);
    });
  }

  ngOnInit() {
    this.storage.get('nain').then((nain) => this.nain = nain);
  }

  Login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
