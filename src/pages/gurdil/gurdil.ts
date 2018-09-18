import { Component, OnInit, ViewChild, ContentChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { Gurdil } from '../../services/gurdil';

/**
 * Generated class for the GurdilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gurdil',
  templateUrl: 'gurdil.html',
})
export class GurdilPage implements OnInit{
  @ViewChild('timerGurdil') timerComponent: TimerCountdownComponent;

  public tempsGurdil: number = 243;//4 min 3 secondes pour le gurdil
  public tempsAfter: number = 250;// chanson offspring apres le gurdil

  public beers: number;

  public nain: NainInterface;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public gurdilService: Gurdil,
              public alertCtrl: AlertController) {
  }

  public ngOnInit() {
      this.storage.get('nain').then((nain) => this.nain = nain);
      this.storage.get('beers').then((beers) => this.beers = beers);
      this.timerComponent.startCountDown();
      this.gurdilService.onEndGurdil.subscribe((end: boolean) => {
          debugger;
        console.log("gurdil ended");
        this.timerComponent.reset();
        //this.timerComponent.timeLeft = this.tempsAfter;
        this.timerComponent.afterGurdil = true;
        this.timerComponent.startCountDown();
        let alert = this.alertCtrl.create({
            title: `Gurdil Terminé avec  ${this.beers} bieres`,
            subTitle: 'Désormais, 10 minutes à tenir pour le valider',
            buttons: ['Santé au général!']
        });
        alert.present();
      });

      this.gurdilService.onAfterGurdil.subscribe((end: boolean) => {
          debugger;
          this.timerComponent.reset();
          let alert = this.alertCtrl.create({
              title: "Tu n'as pas vomi? ...Champion! ",
              subTitle: 'ou pas...',
              buttons: ['Shooters!!']
          });
          alert.present();
      });

  }

  public ionViewDidLoad() {

  }

}
