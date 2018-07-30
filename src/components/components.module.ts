import { NgModule } from '@angular/core';
import { StorageComponent } from './storage/storage';
import { NainComponent } from './nain/nain';
@NgModule({
	declarations: [StorageComponent,
    NainComponent],
	imports: [],
	exports: [StorageComponent,
    NainComponent]
})
export class ComponentsModule {}
