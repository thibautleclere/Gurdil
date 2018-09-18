import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class Beer {

    @Output() public onSetBeers = new EventEmitter<number>();
    @Output() public onDoneBeers = new EventEmitter<number>();

    emitSettingsBeers (nbBeers: number) {
        this.onSetBeers.emit(nbBeers);
    }

    emitDoneBeers (nbBeers: number) {
        this.onDoneBeers.emit(nbBeers);
    }

}