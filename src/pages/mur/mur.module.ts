import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MurPage } from './mur';

@NgModule({
  declarations: [
    MurPage,
  ],
  imports: [
    IonicPageModule.forChild(MurPage),
  ],
})
export class MurPageModule {}
