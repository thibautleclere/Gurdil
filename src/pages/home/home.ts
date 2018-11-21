import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController, Platform } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { Gurdil } from '../../services/gurdil';
import { GurdilPage } from '../gurdil/gurdil';
import { AuthProvider } from '../../providers/auth/auth';
import { SMS, SmsOptions } from '@ionic-native/sms';
import { GurdilAudio } from "../../services/gurdil.audio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  @ViewChild('TimerCountdownComponent') timerComponent: TimerCountdownComponent;

  public nain: NainInterface;
  public liste: NainInterface[];

  public phones: string[];
  public options: SmsOptions = {
      android: {
        intent: 'INTENT'
      }
  };

  public subscriptionEndCountDown;
  public subscriptiononStartGurdil;
  public subscriptiononStart10min;
  public subscriptiononDwarfRemoved;
  public subscriptionLogin;

  constructor(
      public navCtrl: NavController,
      public storage: Storage,
      public gurdil: Gurdil,
      private socialSharing: SMS,
      public authService: AuthProvider,
      public loadCtrl: LoadingController,
      public audio: GurdilAudio,
      public platform: Platform) {

      this.subscriptionEndCountDown = this.gurdil.onEndCountDown.subscribe((start: boolean) => {
        console.log("event end countdown");
      });

      this.subscriptionLogin = this.authService.onLogin.subscribe((login: boolean) => {
        const loading = this.loadCtrl.create({
           content: "Chargement des jeux..."
        });
        loading.present();
        loading.dismiss();

      });

      this.listeninEventsWithCordova();

      this.updateListeNain();

  }

  public ngOnInit() {
    this.storage.get('nain').then((nain) => this.nain = JSON.parse(nain));
    this.liste = [];
    this.phones = [];
    this.audio.initAudio('/assets/sounds/gurdil.mp3', 'audioGurdil');
    this.audio.initAudio('/assets/sounds/aftergurdil.mp3', 'audioAfterGurdil');
  }

  public Login() {
    this.navCtrl.setRoot(LoginPage);
  }

  public listeninEventsWithCordova() {
      this.subscriptiononStart10min = this.gurdil.onStartGurdil.subscribe((start: boolean) => {
          const duration = <HTMLInputElement>document.getElementById('audioGurdil');
          const durationAfter = <HTMLInputElement>document.getElementById('audioAfterGurdil');
          debugger;
          this.navCtrl.push(GurdilPage, {
              audioDuration: duration.value,
              audioAfter: durationAfter.value
          });
      });
      this.subscriptiononStartGurdil = this.gurdil.onStartCountDown.subscribe((start: boolean) => {
          this.liste.forEach((nain) => {
              this.phones.push(nain.phone);
          });
          this.socialSharing.send(this.phones, `Gurdil dans 10 minutes! vous êtes convié`, this.options);
      });
  }

  public updateListeNain() {
      this.subscriptiononDwarfRemoved = this.gurdil.dwarfRemoved.subscribe((nain: NainInterface) => {
          this.liste.splice(this.liste.indexOf(nain), 1);
          if (nain.phone) {
              this.socialSharing.send(nain.phone, `Refuser un gurdil...pauvre merde`, this.options);
          }
      });
  }

  public ionViewWillUnload(): void {
      console.log('will unload');
      this.subscriptionEndCountDown.unsubscribe();
      this.subscriptiononStartGurdil.unsubscribe();
      this.subscriptiononStart10min.unsubscribe();
      this.subscriptiononDwarfRemoved.unsubscribe();
      this.subscriptionLogin.unsubscribe();
  }

  public ionViewDidEnter(): void {
      this.storage.get('joueurs').then((liste) => this.liste = JSON.parse(liste));
  }

}
