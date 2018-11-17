import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { SMS, SmsOptions } from '@ionic-native/sms';
import { Storage } from '@ionic/storage';
import { Game } from '../../services/game';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { SocialSharing } from "@ionic-native/social-sharing";


@Component({
  selector: 'gurdil-player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnInit {

  @Input() public nain: NainInterface;
  @Input() public blagues: string[] = [];

  public options: SmsOptions = {
      android: {
          intent: 'INTENT'
      }
  };

  public optionsCamera: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
      public sms: SMS,
      public storage: Storage,
      public game: Game,
      public camera: Camera,
      public socialSharing: SocialSharing) {}

  public ngOnInit() {
  }

  public randLombard() {
    const rand = Math.floor(Math.random() * 10);
    const message = rand % 2 ? `Cheval` : `Un shooter dans ta gueule ${this.nain.name}. Gurdilement`;
    console.log(message);
    this.sms.send(this.nain.phone, message, this.options);
    this.game.updateGame('Attaque Lombard: ' + this.nain.name + ' a reçu ' + message);
  }

  public randJokes() {
      const message = this.blagues[Math.floor(Math.random() * this.blagues.length)];
      console.log(message);
      this.sms.send(this.nain.phone, message, this.options);
      this.game.updateGame('Aussi: ' + this.nain.name + ' a reçu ' + message);
  }

  public sendPicture() {
    this.camera.getPicture(this.optionsCamera).then((imageData) => {
        this.socialSharing.shareViaWhatsAppToReceiver(this.nain.phone, '', imageData);
    }, (err) => {
        console.log('Erreur camera');
        console.log(err);
    });
  }

}
