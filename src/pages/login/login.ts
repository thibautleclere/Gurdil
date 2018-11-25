import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { SignupPage } from "../signup/signup";
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  telephone: string;
  loading: any;

  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

  }


  login(){

      this.showLoader();

      this.telephone = this.telephone.trim();

      this.authService.login(this.telephone).then((result) => {
          this.loading.dismiss();
          console.log(result);
          this.navCtrl.setRoot(HomePage);
      }, (err) => {
          alert(err);
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage);
      });

  }

  launchSignup(){
      this.navCtrl.push(SignupPage);
  }

  showLoader(){

      this.loading = this.loadingCtrl.create({
          content: 'Authenticating...'
      });

      this.loading.present();

  }

}
