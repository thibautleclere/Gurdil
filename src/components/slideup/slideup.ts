import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'gurdil-slideup',
  templateUrl: 'slideup.html',
  styles: ['slideup.scss']
})
export class SlideupComponent implements OnInit {

  @Input() public text: string;
  @Input() public icon: string;
  @Input() public element: string;

  public players: NainInterface[] = [];

  public constructor(
      public storage: Storage,
      public modalCtrl: ModalController) {}

  public ngOnInit() {
      this.storage.get('joueurs').then((liste) => this.players = JSON.parse(liste));
  }

  public slideUp() {
    debugger;
    const modal = this.modalCtrl.create(ModalplayerComponent, { players: this.players });
    modal.present();
  }

}
