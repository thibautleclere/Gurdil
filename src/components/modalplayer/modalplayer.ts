import { Component, OnInit } from '@angular/core';
import { NainInterface } from "../../models/nain.interface";
import { Storage } from '@ionic/storage';
import { NavParams, ViewController } from "ionic-angular";


@Component({
  selector: 'modalplayer',
  templateUrl: 'modalplayer.html'
})
export class ModalplayerComponent implements OnInit {

  public players: NainInterface[] = [];
  public blagues: string[] = [];

  constructor(
      public data: NavParams,
      public viewCtrl: ViewController,
      public storage: Storage
  ) {
    this.players = data.get('players');
  }


  public ngOnInit() {
      this.storage.get('blagues').then((sBlagues: string) => {
          if (sBlagues) {
              this.blagues = JSON.parse(sBlagues);
          }
      }).catch((err) => {
          console.warn(err);
      });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

}
