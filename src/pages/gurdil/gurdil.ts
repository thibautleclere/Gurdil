import { Component, OnInit, ViewChild, ContentChildren, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { Gurdil } from '../../services/gurdil';
import { GurdilTimerComponent } from '../../components/gurdil-timer/gurdil-timer';
import { PlayerComponent } from '../../components/player/player';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Game } from '../../services/game';


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
  public players: NainInterface[] = [];
  public gurdilEnded: boolean = false;
  public jokes: AngularFireList<string>;
  public blagues: string[] = [];

  public subscriptionEndGurdil;
  public subscriptionAfterGurdil;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public gurdilService: Gurdil,
              public alertCtrl: AlertController,
              public afDatabase: AngularFireDatabase,
              public game: Game) {
      this.jokes = this.afDatabase.list('/blagues');
  }

  public ngOnInit() {
      this.storage.get('nain').then((nain) => this.nain = nain);
      this.storage.get('beers').then((beers) => this.beers = beers);
      this.storage.get('joueurs').then((liste) => {
          this.players = JSON.parse(liste);
          this.game.initGame(this.players);
      });

      this.listenEvents();
      this.getJokes();
  }

  public ionViewDidLeave(): void {
    this.subscriptionEndGurdil.unsubscribe();
    this.subscriptionAfterGurdil.unsubscribe();
  }


  public listenEvents() {

      this.subscriptionEndGurdil = this.gurdilService.onEndGurdil.subscribe((end: boolean) => {
          console.log('end gurdil');
          this.timerComponent.startAfter();
          let alert = this.alertCtrl.create({
              title: `Gurdil Terminé avec  ${this.beers} bieres`,
              subTitle: 'Désormais, 10 minutes à tenir pour le valider',
              buttons: ['Santé au général!']
          });
          alert.present();
      });

      this.subscriptionAfterGurdil = this.gurdilService.onAfterGurdil.subscribe((end: boolean) => {
          this.gurdilEnded = true;
          let alert = this.alertCtrl.create({
              title: "Tu n'as pas vomi? ...Champion! ",
              subTitle: 'ou pas...',
              buttons: ['Shooters!!']
          });
          alert.present();
      });

  }

  public getJokes() {
      this.storage.get('blagues').then((sBlagues: string) => {
          if (sBlagues) {
              this.blagues = JSON.parse(sBlagues);
          } else {
              this.jokes.valueChanges().subscribe((blagues: string[]) => {
                  this.blagues = blagues;
                  this.storage.set('blagues', JSON.stringify(this.blagues));
              }, (err) => {
                  console.warn(err);
              });
          }
      }).catch((reason) => {
          console.warn(reason);
      });
  }

}
