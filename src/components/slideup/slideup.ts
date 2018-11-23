import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import { ModalController } from "ionic-angular";
import { ModalplayerComponent } from "../modalplayer/modalplayer";


@Component({
  selector: 'gurdil-slideup',
  templateUrl: 'slideup.html',
  styles: ['slideup.scss']
})
export class SlideupComponent implements OnInit {

  @Input() public text: string;
  @Input() public icon: string;
  @Input() public element: string;
  @Input() public players: NainInterface[] = [];

  public constructor(
      public storage: Storage,
      public modalCtrl: ModalController) {}

  public ngOnInit() {}

  public slideUp() {
    const modal = this.modalCtrl.create(ModalplayerComponent, { players: this.players });
    modal.present();
  }

}
