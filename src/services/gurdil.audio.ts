import { Injectable } from '@angular/core';

@Injectable()
export class GurdilAudio {


    public constructor(){}

    public initAudio(src): void {
        const sound = new Audio(src);
        sound.addEventListener('loadedmetadata', function(event) {
            const target: HTMLAudioElement = <HTMLAudioElement>event.currentTarget;
            if (target && target.duration) {
                let input  = document.getElementById('audioGurdil');
                input.setAttribute('value', target.duration.toString());
            }
        });
    }

    public playAudio(src: string): void {
        const audio = new Audio(src);
        audio.load();
        audio.play();
    }

}