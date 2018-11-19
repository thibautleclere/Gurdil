import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { ScoreInterface } from '../../models/score.interface';

@Component({
    selector: 'page-palmares',
    templateUrl: 'palmares.html'
})
export class PalmaresPage {

    public players: NainInterface[] = [];
    public score: AngularFireList<ScoreInterface>

    constructor(
        public navCtrl: NavController,
        public storage: Storage,
        public afDatabase: AngularFireDatabase
    ) {
        this.score = this.afDatabase.list('/parties');
    }

    public ionViewDidEnter(): void {
        this.score.valueChanges().subscribe((scores: ScoreInterface[]) => {
            scores.forEach((score: ScoreInterface) => {
               score.players.forEach((player: NainInterface) => {
                    const playerOld = this.players.find((nain: NainInterface) => nain.phone === player.phone);
                    if (playerOld) {
                      this.players.splice(this.players.findIndex((nain: NainInterface) => nain.phone === player.phone), 1);
                      player.beers += playerOld.beers;
                    }
                    this.players.push(player);
               });
            });
            this.players.sort((nainA: NainInterface, nainB: NainInterface) => {
                return nainB.beers - nainA.beers;
            });
        });
    }
}
