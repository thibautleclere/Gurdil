import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NainInterface } from '../../models/nain.interface';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { IMessage } from '../../models/message';


@Component({
  selector: 'modal-upload',
  templateUrl: 'modal-upload.html'
})
export class ModalUploadComponent implements OnInit {

  public image: string;
  public filePath: string;
  public formMessage: FormGroup;
  public nain: NainInterface;
  public errors: string[] = [];
  public task: AngularFireUploadTask;
  public progress: any;
  public savedMessage: AngularFireList<IMessage>;

  constructor(
      public data: NavParams,
      public viewCtrl: ViewController,
      public formBuilder: FormBuilder,
      public afStorage: AngularFireStorage,
      public afDatabase: AngularFireDatabase
  ) {
    this.nain = data.get('nain');
    this.image = data.get('image');
    this.filePath = data.get('filePath');
    this.savedMessage = this.afDatabase.list('/chats');
  }

  public ngOnInit(): void {
    const controlsConfig = {
      texte:['', Validators.required],
      date: [''],
      imageUrl: [''],
      phone: [this.nain.phone, Validators.required]
    };
    this.formMessage = this.formBuilder.group(controlsConfig);
  }

  public dismiss(): void {
      this.viewCtrl.dismiss();
  }

  public upload(): void {
    for (const key in this.formMessage.controls) {
      if (!this.formMessage.controls[key].valid) {
        this.errors.push('Il faut saisir un message espèce de cuve à vide!');
      }
    }
    if (!this.errors || !this.errors.length) {
        this.task = this.afStorage.ref(this.filePath).putString(this.image, 'data_url');
        this.task.then(() => {
          const time = (new Date()).toDateString();
          const message : IMessage = {
            date: time,
            imageUrl: this.filePath,
            phone: this.nain.phone,
            texte: this.formMessage.controls['texte'].value
          };
          this.savedMessage.push(message);
        });
        this.progress = this.task.percentageChanges();
    }
  }

}
