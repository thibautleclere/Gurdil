import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from "../../models/nain.interface";
import { Storage } from '@ionic/storage';
import { NavParams } from "ionic-angular";


@Component({
  selector: 'modalplayer',
  templateUrl: 'modalplayer.html'
})
export class ModalplayerComponent implements OnInit {

  public players: NainInterface[] = [];

  constructor(
      data: NavParams
  ) {
    this.players = data.get('players');
  }


  public ngOnInit() {
    this.players;debugger;
  }

}
