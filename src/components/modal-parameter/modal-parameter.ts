import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';
import { Storage } from '@ionic/storage';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';


@Component({
  selector: 'modal-parameter',
  templateUrl: 'modal-parameter.html'
})
export class ModalParameterComponent implements OnInit {

  public formUrl: FormGroup;
  public nain: NainInterface;
  public jokes: AngularFireList<string>;
  public urlAnnonces: string;
  public urlVideo: string;

  public constructor(
      public viewCtrl: ViewController,
      public formBuilder: FormBuilder,
      public storage: Storage,
      public afDatabase: AngularFireDatabase
  ) {
      this.jokes = this.afDatabase.list('/blagues')
  }


  public ngOnInit (): void {
      const controlsConfig = {
          annonces6:['', Validators.required],
          video: ['', Validators.required],
          kaamelott: ['']
      };
      this.formUrl = this.formBuilder.group(controlsConfig);
      this.storage.get('6annonces').then((url) => this.urlAnnonces = url);
      this.storage.get('video').then((url) => this.urlVideo = url);
  }

  public close(): void {
    this.viewCtrl.dismiss();
  }

  public saveChanges(): void {
      if (this.formUrl.controls['annonces6'].valid && this.formUrl.controls['annonces6'].value) {
        this.storage.set('6annonces', this.formUrl.controls['annonces6'].value);
      }
      if (this.formUrl.controls['video'].valid && this.formUrl.controls['video'].value) {
        this.storage.set('video', this.formUrl.controls['video'].value);
      }
  }

  public addJoke(): void {
      if (this.formUrl.controls['kaamelott'].valid && this.formUrl.controls['kaamelott'].value) {
          const joke = this.formUrl.controls['kaamelott'].value;
          this.jokes.push(joke);
      }
  }
}
