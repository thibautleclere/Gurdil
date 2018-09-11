export interface IGurdil{
    texte: string,
    time: ITimer
}
export interface ITimer {
    minutes: number,
    secondes: number,
    begin: boolean,
    end: boolean
}