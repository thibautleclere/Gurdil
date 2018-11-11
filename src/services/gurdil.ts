import { EventEmitter, Injectable, Output } from '@angular/core';
import { NainInterface } from "../models/nain.interface";
import { Storage } from '@ionic/storage';

@Injectable()
export class Gurdil {

    @Output() public onStartCountDown = new EventEmitter<boolean>();
    @Output() public onEndCountDown = new EventEmitter<boolean>();
    @Output() public onStartGurdil = new EventEmitter<boolean>();
    @Output() public onEndGurdil = new EventEmitter<boolean>();
    @Output() public onAfterGurdil = new EventEmitter<boolean>();
    @Output() public dwarfAdded = new EventEmitter<NainInterface>();
    @Output() public dwarfRemoved = new EventEmitter<NainInterface>();

    public constructor(
      public storage: Storage
    ){}

    public emit10minutes () {
        this.onStartCountDown.emit(true);
    }

    public emitEnd10minutes () {
        this.onEndCountDown.emit(true);
    }

    public emitGurdil () {
        this.onStartGurdil.emit(true);
    }

    public emitEndGurdil() {
        this.onEndGurdil.emit(true);
    }

    public emitEndAfterGurdil() {
        this.onAfterGurdil.emit(true);
    }

    public addNainToGurdil(nain: NainInterface) {
        this.storage.get('joueurs').then((data: string) => {
            let listNains = [];
            if (data) {
               listNains = JSON.parse(data);
           }
           listNains.push(nain);
           this.storage.set('joueurs', JSON.stringify(listNains)).then(() => {
               this.dwarfAdded.emit(nain);
           });
        });
    }

    public deleteToGurdil(nain: NainInterface) {
        this.storage.get('joueurs').then((data: string) => {
            let listNains = [];
            if (data) {
                listNains = JSON.parse(data);
            }
            const index = listNains.map((dwarf: NainInterface) => dwarf.phone).indexOf(nain.phone);
            listNains.splice(index, 1);
            this.storage.set('joueurs', JSON.stringify(listNains)).then(() => {
                this.dwarfRemoved.emit(nain);
            });
        });
    }

}