import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage} from '../login/login';
import { NainInterface } from "../../models/nain.interface";
import { Storage } from '@ionic/storage';
import { MenuComponent } from "../../components/menu/menu";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  @ViewChild('menu') menuComponent: MenuComponent;

  public nain: NainInterface;

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  ngOnInit() {
    this.storage.get('nain').then((nain) => this.nain = nain);
  }

  Login() {
    this.navCtrl.setRoot(LoginPage);
  }

}
