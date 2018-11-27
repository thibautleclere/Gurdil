import { Component } from '@angular/core';
import { PalmaresInterface } from '../../models/score.interface';
import { NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalpalmaresComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modalpalmares',
  templateUrl: 'modalpalmares.html'
})
export class ModalpalmaresComponent {

  public palmares: PalmaresInterface[] = [];

  constructor(
      public data: NavParams,
      public viewCtrl: ViewController
  ) {
    this.palmares = data.get('palmares');
  }

    public dismiss(): void {
        this.viewCtrl.dismiss();
    }

}
