import {AfterViewChecked, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import { Content, IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { IMessage } from '../../models/message';
import DataSnapshot = firebase.database.DataSnapshot;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NainInterface } from '../../models/nain.interface';
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-mur',
  templateUrl: 'mur.html',
})
export class MurPage implements OnInit, AfterViewChecked {

  @ViewChild(Content)
  public content: Content;

  public messages: IMessage[];

  public tabs: any;
  public formMessage: FormGroup;
  public nain: NainInterface;
  public optionsCamera: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  public error: string;
  public image: string;
  public savedMessage: AngularFireList<IMessage>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public afStorage: AngularFireStorage,
      public afDatabase: AngularFireDatabase,
      public zone: NgZone,
      public formBuilder: FormBuilder,
      public camera: Camera,
      public modalCtrl: ModalController) {
      this.savedMessage = this.afDatabase.list('/chats');
  }

  public ngOnInit(): void {
      this.nain = this.navParams.get('nain');
      this.initForm();
      this.messages = [];
      this.readChats();
  }

  private initForm(): void {
      const controlsConfig = {
          texte:['', Validators.required],
          date: [''],
          imageUrl: [''],
          phone: [this.nain.phone, Validators.required],
          name: [this.nain.name, Validators.required]
      };
      this.formMessage = this.formBuilder.group(controlsConfig);
  }

  private readChats(): void {
      const ref = this.afDatabase.database.ref('/chats');
      ref.limitToLast(100).once('value').then((snapShot: DataSnapshot) => {
          snapShot.forEach((value: DataSnapshot) => {
              this.zone.run(() => {
                  this.toMessage(value);
              });
          });
      });
  }

  private toMessage(snap: DataSnapshot): void {
      let data = snap.val();
      if (data) {
          let message = {
              date: data.date,
              phone: data.phone,
              name: data.name,
              texte: data.texte,
              imageTrueUrl: ''
          };
          if (data.imageUrl) {
              this.afStorage.ref(data.imageUrl).getDownloadURL().subscribe((url) => {
                  message.imageTrueUrl = url;
              });
          }
          const isPresent = this.messages.some((mess: IMessage) => {
              return mess.texte === message.texte && mess.phone === message.phone && mess.date === message.date
          });
          if (!isPresent) {
              this.messages.push(message);
          }
      }
  }


  /**
   * non used
   * @returns {IMessage[]}
   */
  private sortMessages(): IMessage[] {
      return this.messages.sort((messA: IMessage, messB: IMessage) => {
         return messA.date > messB.date ? -1 : 1;
      });
  }

  public addMessage(): void {
      for (const key in this.formMessage.controls) {
          if (!this.formMessage.controls[key].valid) {
              console.warn('Il faut saisir un message espèce de cuve à vide!');
              return;
          }
      }
      const time = (new Date()).getTime();
      const message : IMessage = {
          date: time,
          imageUrl: '',
          phone: this.nain.phone,
          texte: this.formMessage.controls['texte'].value,
          name: this.nain.name
      };
      this.messages.push(message);
      this.savedMessage.push(message);
      setTimeout(() => this.content.scrollToBottom(500), 100);
      this.formMessage.controls['texte'].reset();
  }


  public takePicture(): void {

    this.camera.getPicture(this.optionsCamera).then((imageData) => {
        this.image = 'data:image/jpeg;base64,' + imageData;
        const time = (new Date()).toLocaleTimeString();
        const filePath = `imagesGurdil/${this.nain.phone}/${time}.jpg`;
        const modal = this.modalCtrl.create(ModalUploadComponent, {
            'filePath': filePath,
            'image': this.image,
            'nain': this.nain
        });
        modal.present();
        modal.onDidDismiss(() => {
           console.warn('dismiss chats');
           this.readChats();
        });
    }, (err) => {
        console.error(err);
        this.error = err;
    });
  }

  public remove(): void {
      this.error = null;
  }

  public ngAfterViewChecked(): void {
      this.goBottom();
  }

  public goBottom(): void {
      this.content.scrollToBottom();
  }
}
