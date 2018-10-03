import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';
import { GurdilTimerComponent } from './gurdil-timer/gurdil-timer';
import { AddingbeersComponent } from './addingbeers/addingbeers';
import { PlayerComponent } from './player/player';

@NgModule({
	declarations: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent],
    schemas: []
})
export class ComponentsModule {}
