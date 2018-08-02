import {Component, Input} from '@angular/core';
import {NainInterface} from "../../models/nain.interface";

/**
 * Generated class for the MenuComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'gurdil-menu-component',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  text: string;

  @Input() public nain: NainInterface;

  constructor() {
    console.log('Hello MenuComponent Component');
    this.text = 'Hello World';
  }

}
