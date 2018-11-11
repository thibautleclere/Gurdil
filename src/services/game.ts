import { EventEmitter, Injectable, Output } from '@angular/core';
import { NainInterface } from '../models/nain.interface';
import { Storage } from '@ionic/storage';

@Injectable()
export class Game {

    public static INTRO: string = "Resultat du Gurdil: ";

    public constructor(
        public storage: Storage
    ){}

    public setGame(listeNain: NainInterface[]): string {
        let content =  Game.INTRO;
        listeNain.forEach((nain: NainInterface) => {
            content += '; '+ nain.name + ' ' + nain.phone + ' ' + nain.beers + ' bières';
        });
        return content;
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
        return this.storage.get('partie').then((content) => {
            return this.storage.get('joueurs').then((liste: string) => {
                let players = [];
                if (liste) {
                    players = JSON.parse(liste);
                }
                const jeu = this.setGame(players);
                return jeu + " ; " + content;
            });
        });
    }
}