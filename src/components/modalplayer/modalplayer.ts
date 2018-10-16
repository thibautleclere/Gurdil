import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from "../../models/nain.interface";
import { Storage } from '@ionic/storage';
import { NavParams, ViewController } from "ionic-angular";


@Component({
  selector: 'modalplayer',
  templateUrl: 'modalplayer.html'
})
export class ModalplayerComponent implements OnInit {

  public players: NainInterface[] = [];

  constructor(
      public data: NavParams,
      public viewCtrl: ViewController
  ) {
    this.players = data.get('players');
  }


  public ngOnInit() {
    this.players;debugger;
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
