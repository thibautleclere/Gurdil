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
            content += '; '+ nain.name + ' ' + nain.phone + ' ' + nain.beers + ' bières';
        });
        this.storage.set('partie', content);
    }

    public updateGame(message: string): void {
        this.storage.get('partie').then((content: string) => {
            content = content + '; ' + message;
            this.storage.set('partie', content);
        });
    }

    public removeGame(): void {
        this.storage.remove('partie');
        this.storage.remove('beers');
        this.storage.remove('joueurs');
    }

    public getGameResume(): Promise<string> {
        return this.storage.get('partie').then((content) => content);
    }
}