import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';

/**
 * Generated class for the MurPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mur',
  templateUrl: 'mur.html',
})
export class MurPage {

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public fireStore: AngularFirestore) {}

  public ionViewDidLoad(): void {

  }

  public ionViewDidEnter(): void {

  }

}
