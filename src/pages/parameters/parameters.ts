import { Component, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
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


  public dwarfForm: FormGroup;
  public listNains: NainInterface[] = [];
  public savedDwarves: AngularFireList<NainInterface>;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
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
          phone: new FormControl('', [Validators.required]),
          email: new FormControl('')
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
  }

  public addDwarf() {

      const name = this.dwarfForm.controls['nom'].value;
      const phone = this.dwarfForm.controls['phone'].value;
      const email = this.dwarfForm.controls['email'].value;
      const nain: NainInterface = { name: name, phone: phone };
      if (email) {
          nain.email = email;
      }
      this.listNains.push(nain);
      this.storage.set('nains', JSON.stringify(this.listNains));
      this.dwarfForm.reset();
      this.savedDwarves.push(nain);
  }

  public addDwarfToGurdil(nain: NainInterface) {
      this.gurdilService.addNainToGurdil(nain);
  }

}
