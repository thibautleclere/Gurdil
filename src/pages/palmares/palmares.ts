import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-palmares',
    templateUrl: 'palmares.html'
})
export class PalmaresPage {
    selectedItem: any;
    drawes: Array<{name: string, score: string}>;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // Let's populate this page with some filler content for funzies
        this.drawes = [
            {name:'jn', score:'8'},
            {name:'watrin', score:'7'},
            {name:'lombard', score:'5'},
            {name:'leclere', score:'4'},
            {name:'benji', score:'4'},
            {name:'john', score:'3'},
            {name:'meyer', score:'4'}
        ];
    }

    chooseDrawf(event, player) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(PalmaresPage, {
            drawf: player
        });
    }
}
