import { Component } from '@angular/core';

/**
 * Generated class for the NainComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'nain',
  templateUrl: 'nain.html'
})
export class NainComponent {

  text: string;

  constructor() {
    console.log('Hello NainComponent Component');
    this.text = 'Hello World';
  }

}
