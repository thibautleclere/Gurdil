import { NainInterface } from './nain.interface';

export interface ScoreInterface {
    players: NainInterface[];
    date: string;
}
export interface PalmaresInterface {
    annee: number;
    scores: ScoreInterface[];
    joueurs?: NainInterface[];
}