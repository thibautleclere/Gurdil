import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MenuComponent } from './menu/menu';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [MenuComponent],
	imports: [IonicPageModule.forChild(MenuComponent)],
	exports: [MenuComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
