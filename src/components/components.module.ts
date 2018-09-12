import { NgModule } from '@angular/core';
import {IonicModule, IonicPageModule} from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';
import {HomePageModule} from "../pages/home/home.module";
import {GurdilPageModule} from "../pages/gurdil/gurdil.module";
@NgModule({
	declarations: [TimerCountdownComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent],
    schemas: []
})
export class ComponentsModule {}
