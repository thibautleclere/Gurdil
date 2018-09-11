import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TimerCountdownComponent } from '../../components/timer-countdown/timer-countdown';
import { NainInterface } from "../../models/nain.interface";

/**
 * Generated class for the GurdilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gurdil',
  templateUrl: 'gurdil.html',
})
export class GurdilPage implements OnInit{
  @ViewChild('gurdiltimer') timerComponent: TimerCountdownComponent;

  public nain: NainInterface;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public ionViewDidLoad() {
  }

  public ngOnInit() {
      //this.storage.get('nain').then((nain) => this.nain = nain);
  }

}
