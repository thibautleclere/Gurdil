import { Component, Input, OnInit } from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { SMS, SmsOptions } from '@ionic-native/sms';
import { Storage } from '@ionic/storage';
import { Game } from '../../services/game';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {EmailComposer} from '@ionic-native/email-composer';


@Component({
  selector: 'gurdil-player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnInit {

  @Input() public nain: NainInterface;
  @Input() public blagues: string[] = [];
  public message_error; string = '';

  public options: SmsOptions = {
      android: {
          intent: 'INTENT'
      }
  };

  public optionsCamera: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
      public sms: SMS,
      public storage: Storage,
      public game: Game,
      public camera: Camera,
      public emailService: EmailComposer) {}

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
      if (this.nain.email) {
          this.camera.getPicture(this.optionsCamera).then((imageData) => {
              imageData = 'base64:gurdil.png//'+imageData;
              const email = {
                  to: this.nain.email,
                  attachments: [
                      imageData
                  ],
                  subject: 'Gurdil Image',
                  body: `Gurdil!!! Tu as reçu une photo du gurdil ${this.nain.name}! Bisous`,
                  isHtml: true
              };
              this.emailService.open(email);
          }, (err) => {
              this.message_error = err;
          });
      } else {
            this.message_error = `Gueux! ${this.nain.name} n'a d'email enregistré, impossible dans ce cas de lui envoyer un email`;
      }
  }

}
