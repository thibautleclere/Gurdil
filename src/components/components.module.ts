import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimerCountdownComponent } from './timer-countdown/timer-countdown';
import { GurdilTimerComponent } from './gurdil-timer/gurdil-timer';
import { AddingbeersComponent } from './addingbeers/addingbeers';
import { PlayerComponent } from './player/player';
import { SlideupComponent } from './slideup/slideup';
import { ModalplayerComponent } from './modalplayer/modalplayer';
import { ModalresultsComponent } from './modalresults/modalresults';
import { ModalpalmaresComponent } from './modalpalmares/modalpalmares';

@NgModule({
	declarations: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent,
    SlideupComponent,
    ModalplayerComponent,
    ModalresultsComponent,
    ModalpalmaresComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent,
    SlideupComponent,
    ModalplayerComponent,
    ModalresultsComponent,
    ModalpalmaresComponent],
    schemas: [],
    entryComponents: [ModalplayerComponent, ModalresultsComponent, ModalpalmaresComponent]
})
export class ComponentsModule {}
