import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { TimerCountdownComponent } from './timer-countdown';

@NgModule({
    declarations: [
        TimerCountdownComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        TimerCountdownComponent
    ]
})
export class TimerCountdownComponentModule {}