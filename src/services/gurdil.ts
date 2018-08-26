import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class Gurdil {

    @Output() public onStartCountDown = new EventEmitter<boolean>();
    @Output() public onEndCountDown = new EventEmitter<boolean>();
    @Output() public onStartGurdil = new EventEmitter<boolean>();
    @Output() public onEndGurdil = new EventEmitter<boolean>();

    emit10minutes () {
        this.onStartCountDown.emit(true);
    }

    emitEnd10minutes () {
        this.onEndCountDown.emit(true);
    }

    emitGurdil () {
        this.onStartGurdil.emit(true);
    }

    emitEndGurdil() {
        this.onEndGurdil.emit(true);
    }

}