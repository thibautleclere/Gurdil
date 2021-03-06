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
import { ModalUploadComponent } from './modal-upload/modal-upload';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { ModalParameterComponent } from './modal-parameter/modal-parameter';

@NgModule({
	declarations: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent,
    SlideupComponent,
    ModalplayerComponent,
    ModalresultsComponent,
    ModalpalmaresComponent,
    ModalUploadComponent,
    ProgressBarComponent,
    ModalParameterComponent],
	imports: [IonicPageModule.forChild(TimerCountdownComponent)],
	exports: [TimerCountdownComponent,
    GurdilTimerComponent,
    AddingbeersComponent,
    PlayerComponent,
    PlayerComponent,
    SlideupComponent,
    ModalplayerComponent,
    ModalresultsComponent,
    ModalpalmaresComponent,
    ModalUploadComponent,
    ProgressBarComponent,
    ModalParameterComponent],
    schemas: [],
    entryComponents: [
        ModalplayerComponent,
        ModalresultsComponent,
        ModalpalmaresComponent,
        ModalUploadComponent,
        ModalParameterComponent
    ]
})
export class ComponentsModule {}
