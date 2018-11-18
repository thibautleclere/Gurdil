export interface ScoreInterface {
    players: PlayerInterface[];
}
export interface PlayerInterface {
    nom: string;
    phone: string;
    score: number;
    date: string;
}