import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { Beer } from '../../services/beer';
import {Game} from "../../services/game";

@Component({
    selector: 'page-palmares',
    templateUrl: 'palmares.html'
})
export class PalmaresPage {

    public players: NainInterface[] = [];

    constructor(
        public navCtrl: NavController,
        public storage: Storage,
        public beerService: Beer
    ) {}

    public ionViewDidEnter(): void {
        this.storage.get('joueurs').then((liste: string) => {
            if (liste) {
                this.players = JSON.parse(liste);
            }
            this.players.sort((nainA: NainInterface, nainB: NainInterface) => {
                return nainB.beers - nainA.beers;
            });
        });
    }

    public addBeer(nain: NainInterface): void {
       nain.beers++;
       this.beerService.beerAddedToDwarf(nain.beers, nain);
    }

    public rmBeer(nain: NainInterface): void {
       if (nain.beers > 0) {
           nain.beers--;
           this.beerService.beerAddedToDwarf(nain.beers, nain);
       }
    }
}
