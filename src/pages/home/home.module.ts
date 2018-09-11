import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';


@NgModule({
    declarations: [HomePage, TimerCountdownComponent],
    imports: [
        IonicPageModule.forChild(HomePage)
    ]
})
export class HomePageModule {}