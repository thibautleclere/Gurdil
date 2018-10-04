import { Component, OnInit, ViewChild, ContentChildren, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { Gurdil } from '../../services/gurdil';
import { GurdilTimerComponent } from '../../components/gurdil-timer/gurdil-timer';
import { PlayerComponent } from '../../components/player/player';


@IonicPage()
@Component({
  selector: 'page-gurdil',
  templateUrl: 'gurdil.html',
})
export class GurdilPage implements OnInit{
  @ViewChild('timerGurdil') timerComponent: GurdilTimerComponent;
  @ViewChildren('listePlayers') playerComponents: QueryList<PlayerComponent>;

  public tempsGurdil: number = 243;//4 min 3 secondes pour le gurdil
  public tempsAfter: number = 250;// chanson offspring apres le gurdil

  public beers: number;
  public nain: NainInterface;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public gurdilService: Gurdil,
              public alertCtrl: AlertController) {}

  public ngOnInit() {
      this.storage.get('nain').then((nain) => this.nain = nain);
      this.storage.get('beers').then((beers) => this.beers = beers);

      this.listenEvents();
  }

  public ionViewDidLoad() {}


  public listenEvents() {

      this.gurdilService.onEndGurdil.subscribe((end: boolean) => {
          console.log('end gurdil');
          this.timerComponent.startAfter();
          let alert = this.alertCtrl.create({
              title: `Gurdil Terminé avec  ${this.beers} bieres`,
              subTitle: 'Désormais, 10 minutes à tenir pour le valider',
              buttons: ['Santé au général!']
          });
          alert.present();
      });

      this.gurdilService.onAfterGurdil.subscribe((end: boolean) => {
          let alert = this.alertCtrl.create({
              title: "Tu n'as pas vomi? ...Champion! ",
              subTitle: 'ou pas...',
              buttons: ['Shooters!!']
          });
          alert.present();
      });

  }

}
