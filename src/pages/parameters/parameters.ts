import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NainInterface } from '../../models/nain.interface';
import { Gurdil } from '../../services/gurdil';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";


@IonicPage()
@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html',
})
export class ParametersPage implements OnInit {


  public viawhatsapp: boolean = false;
  public viasms: boolean = false;
  public dwarfForm: FormGroup;
  public listNains: NainInterface[] = [];
  public savedDwarves: AngularFireList<NainInterface>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public camera: Camera,
      public storage: Storage,
      public gurdilService: Gurdil,
      public alertCtrl: AlertController,
      public afDatabase: AngularFireDatabase) {
      this.savedDwarves = this.afDatabase.list('/groupes/players');
    }

  public ngOnInit() {
      this.savedDwarves.valueChanges().subscribe((dwarves: NainInterface[]) => {
          dwarves.forEach((dwarf: NainInterface) => {
             if (this.listNains.map((element) => element.phone).indexOf(dwarf.phone) === -1) {
                 this.listNains.push(dwarf);
             }
          });
      }, (err) => {
          console.warn(err);
      });
      this.dwarfForm = new FormGroup({
          nom: new FormControl('',[Validators.required]),
          phone: new FormControl('', [Validators.required])
      });
      this.gurdilService.dwarfAdded.subscribe((nain: NainInterface) => {
          const alert = this.alertCtrl.create({
              title: `${nain.name} participe`,
              subTitle: `a été notifié au ${nain.phone}`,
              buttons: ['OK']
          });
          alert.present();
      });
  }

  public ionViewDidLoad() {
      /*const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          let base64Image = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
          // Handle error
      });*/
  }

  public addDwarf() {

      const name = this.dwarfForm.controls['nom'].value;
      const phone = this.dwarfForm.controls['phone'].value;
      const nain: NainInterface = { name: name, phone: phone };
      this.listNains.push(nain);
      this.storage.set('nains', JSON.stringify(this.listNains));
      this.dwarfForm.reset();
      this.savedDwarves.push(nain);
  }

  public addDwarfToGurdil(nain: NainInterface) {
      this.gurdilService.addNainToGurdil(nain);
  }

}
