import { Component } from '@angular/core';
@Component({
    templateUrl: 'form.html',
})
export class FormsPage {

    beers = 0;
    logForm() {
        console.log(this.beers)
    }
}