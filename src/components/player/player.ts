import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { SMS, SmsOptions } from '@ionic-native/sms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'gurdil-player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnInit {

  @Input() public nain: NainInterface;

  public options: SmsOptions = {
      android: {
          intent: 'INTENT'
      }
  };

  constructor(
      public sms: SMS,
      public storage: Storage) {}

  public ngOnInit() {

  }

  public randLombard() {
    const rand = Math.floor(Math.random() * 10);
    const message = rand % 2 ? `Cheval` : `Un shooter dans ta gueule ${this.nain.name}. Gurdilement`;
    console.log(message);
    this.sms.send(this.nain.phone, message, this.options);
  }

}
