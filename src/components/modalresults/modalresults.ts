import { Component } from '@angular/core';
import { NainInterface } from "../../models/nain.interface";
import {NavParams, ViewController} from "ionic-angular";


@Component({
  selector: 'modalresults',
  templateUrl: 'modalresults.html'
})
export class ModalresultsComponent {

  public players: NainInterface;

  public constructor(
      public data: NavParams,
      public viewCtrl: ViewController
  ) {
      this.players = data.get('players');
  }

  public dismiss(): void {
    this.viewCtrl.dismiss();
  }

}
