import { EventEmitter, Injectable, Output } from '@angular/core';
import { NainInterface } from '../models/nain.interface';
import { Storage } from '@ionic/storage';

@Injectable()
export class Beer {

    @Output() public onSetBeers = new EventEmitter<number>();
    @Output() public onDoneBeers = new EventEmitter<number>();

    public listNains: NainInterface[] = [];

    public constructor(
        public storage: Storage
    ){}

    public emitSettingsBeers (nbBeers: number) {
        this.onSetBeers.emit(nbBeers);
    }

    public emitDoneBeers (nbBeers: number) {
        this.onDoneBeers.emit(nbBeers);
    }

    public beerAddedToDwarf(beers: number, nain: NainInterface) {
        this.storage.get('joueurs').then((data: string) => {
            if (data) {
                this.listNains = JSON.parse(data);
            }
            this.listNains.splice(this.listNains.findIndex((dwarf) => dwarf.phone === nain.phone), 1);
            nain.beers = beers;
            this.listNains.push(nain);
            this.storage.set('joueurs', JSON.stringify(this.listNains))
                .catch((err) => console.warn(err))
        });
    }
}