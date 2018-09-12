import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GurdilPage } from './gurdil';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    GurdilPage
  ],
  imports: [
    IonicPageModule.forChild(GurdilPage),
    ComponentsModule
  ],
})
export class GurdilPageModule {}
