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

  public toogle: boolean;

  public players: NainInterface[] = [];

  public constructor(public storage: Storage) {}

  public ngOnInit() {
      this.storage.get('joueurs').then((liste) => this.players = JSON.parse(liste));
      this.toogle = false;
  }

  public slideUp() {
    this.toogle = !this.toogle;
  }

}
