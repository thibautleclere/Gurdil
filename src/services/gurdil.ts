import { EventEmitter, Injectable, Output } from '@angular/core';
import {NainInterface} from "../models/nain.interface";

@Injectable()
export class Gurdil {

    @Output() public onStartCountDown = new EventEmitter<boolean>();
    @Output() public onEndCountDown = new EventEmitter<boolean>();
    @Output() public onStartGurdil = new EventEmitter<boolean>();
    @Output() public onEndGurdil = new EventEmitter<boolean>();
    @Output() public onAfterGurdil = new EventEmitter<boolean>();

    public listNains: NainInterface[] = [];

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

    public addNains(nain: NainInterface) {
        this.listNains.push(nain);
    }

}