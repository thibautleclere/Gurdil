import { EventEmitter, Injectable, Output } from '@angular/core';
import { NainInterface } from '../models/nain.interface';
import { Storage } from '@ionic/storage';

@Injectable()
export class Game {

    public listNains: NainInterface[] = [];
    public static INTRO: string = "Phrase d'intro";

    public constructor(
        public storage: Storage
    ){}

    public initGame(listeNain: NainInterface[]): void {
        let content: string = Game.INTRO;
        listeNain.forEach((nain: NainInterface) => {
            content += nain.name + ' ' + nain.phone + ' ' + nain.beers + ' bières';
        });
    }

    public updateGame(): void {

    }

    public removeGame(): void {
        this.storage.remove('partie');
        this.storage.remove('beers');
    }
}