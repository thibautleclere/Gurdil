import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, Platform } from 'ionic-angular';
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

  public phones: string[];
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
      public beerService: Beer,
      public platform: Platform) {

      this.gurdil.onEndCountDown.subscribe((start: boolean) => {
        console.log("event end countdown");
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
        });

      });

      if (this.platform.is('cordova')) {
        this.listeninEventsWithCordova();
      }

      this.updateListeNain();

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


  public listeninEventsWithCordova() {
      this.gurdil.onStartGurdil.subscribe((start: boolean) => {
          this.liste.forEach((nain) => this.phones.push(nain.phone));
          this.socialSharing.send(this.phones, `Test: Gurdil dans 10 minutes! ${this.beers} pour moi`, this.options);
          this.storage.set('beers', this.beers);
          this.navCtrl.setRoot(GurdilPage);
      });
      this.gurdil.dwarfRemoved.subscribe((nain: NainInterface) => {
          if (nain.phone) {
              this.socialSharing.send(nain.phone, `Refuser un gurdil...pauvre merde`);
          }
      });
  }

  public updateListeNain() {
      this.gurdil.dwarfRemoved.subscribe((nain: NainInterface) => {
          this.liste.splice(this.liste.indexOf(nain), 1);
      });
  }

}
