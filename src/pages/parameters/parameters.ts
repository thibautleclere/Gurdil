import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Sim } from '@ionic-native/sim';

/**
 * Generated class for the ParametersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-parameters',
  templateUrl: 'parameters.html',
})
export class ParametersPage {


  public viawhatsapp: boolean = false;
  public viasms: boolean = false;
  public info: any = null;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public sim: Sim) {
  }

  public ionViewDidLoad() {

      this.sim.getSimInfo().then(
          (info) => this.info = info,
          (err) => console.log('Unable to get sim info: ', err)
      );

      this.sim.hasReadPermission().then(
          (info) => console.log('Has permission: ', info)
      );

      this.sim.requestReadPermission().then(
          () => console.log('Permission granted'),
          () => console.log('Permission denied')
      );
  }

}
