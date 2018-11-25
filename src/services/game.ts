import { Injectable } from '@angular/core';
import { NainInterface } from '../models/nain.interface';
import { Storage } from '@ionic/storage';
import { ScoreInterface } from "../models/score.interface";

@Injectable()
export class Game {

    public static INTRO: string = `Resultat du Gurdil: \n`;

    public constructor(
        public storage: Storage
    ){
    }

    public setGame(listeNain: NainInterface[]): string {
        let content =  Game.INTRO;
        listeNain.forEach((nain: NainInterface) => {
            content += `${nain.name} a fait ${nain.beers} bières \n`;
        });
        return content;
    }

    public updateGame(message: string): void {
        this.storage.get('partie').then((content: string) => {
            if (!content) {
                content = '';
            }
            content += `${message} \n`;
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

    public saveGameToBDD(): Promise<ScoreInterface> {
        return this.storage.get('joueurs').then((liste: string) => {
            let players = [];
            if (liste) {
                players = JSON.parse(liste);
            }
            const now = new Date();
            const score: ScoreInterface = {
                players: [],
                date: now.toLocaleDateString()
            };
            players.forEach((nain: NainInterface) => {
                if (!nain.beers) {
                    nain.beers = 0;
                }

                score.players.push(nain);
            });
            return score;
        });
    }
}