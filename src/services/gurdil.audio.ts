import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable()
export class GurdilAudio {


    @Output() public onGetDuration = new EventEmitter<number>();

    public constructor(){}

    public initAudio(src): void {
        const sound = new Audio(src);
        sound.addEventListener('loadedmetadata', function(event) {
            if (event.currentTarget && event.currentTarget.duration) {
                let input  = document.getElementById('audioGurdil');
                input.setAttribute('value', event.currentTarget.duration);
            }
        });
    }

    public sendDuration(duration: number): void {
        this.onGetDuration.emit(duration);
    }

}