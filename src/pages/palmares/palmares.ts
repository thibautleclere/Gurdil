import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { PalmaresInterface, ScoreInterface } from '../../models/score.interface';

@Component({
    selector: 'page-palmares',
    templateUrl: 'palmares.html'
})
export class PalmaresPage {

    public players: NainInterface[] = [];
    public score: AngularFireList<ScoreInterface>;
    public palmares: PalmaresInterface[];

    constructor(
        public navCtrl: NavController,
        public storage: Storage,
        public afDatabase: AngularFireDatabase
    ) {
        this.score = this.afDatabase.list('/parties');
    }

    public ionViewDidEnter(): void {
        this.score.valueChanges().subscribe((scores: ScoreInterface[]) => {
            this.palmares = this.sortScoresByGroup(scores);
            this.palmares.forEach((palm : PalmaresInterface) => {
                const joueurs: NainInterface[] = [];
                palm.scores.forEach((score: ScoreInterface) => {
                    score.players.forEach((player: NainInterface) => {
                        const playerOld = joueurs.find((nain: NainInterface) => nain.phone === player.phone);
                        if (playerOld) {
                            joueurs.splice(joueurs.findIndex((nain: NainInterface) => nain.phone === player.phone), 1);
                            player.beers += playerOld.beers;
                        }
                        joueurs.push(player);
                    });
                });
                joueurs.sort((nainA: NainInterface, nainB: NainInterface) => {
                    return nainB.beers - nainA.beers;
                });
                palm.joueurs = joueurs;
            });
        });
    }

    public sortScoresByGroup(scores: ScoreInterface[]): PalmaresInterface[] {
        const years: number[] = [];
        scores.forEach((score: ScoreInterface) => {
            const date = score.date.split('/');
            const annee = parseInt(date[2]);
            if (years.indexOf(annee) === -1) {
                years.push(annee);
            }
        });
        let palmares: PalmaresInterface[] = [];
        years.forEach((year: number) => {
            let palm: PalmaresInterface = {
                annee: year,
                scores: []
            };
            scores.forEach((score: ScoreInterface) => {
                const date = score.date.split('/');
                const annee = parseInt(date[2]);
                if (palm.annee === annee) {
                    palm.scores.push(score);
                }
            });
            palmares.push(palm);
        });
        return palmares;
    }
}
