import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';

@NgModule({
	declarations: [TimerCountdownComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent],
    schemas: []
})
export class ComponentsModule {}
