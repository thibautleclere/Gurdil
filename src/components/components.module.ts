import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';
import { GurdilTimerComponent } from './gurdil-timer/gurdil-timer';
import { AddingbeersComponent } from './addingbeers/addingbeers';

@NgModule({
	declarations: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent],
    schemas: []
})
export class ComponentsModule {}
