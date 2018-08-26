import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { IonicPageModule } from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';
@NgModule({
	declarations: [MenuComponent,
    TimerCountdownComponent],
	imports: [IonicPageModule.forChild(MenuComponent), IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [MenuComponent,
    TimerCountdownComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
