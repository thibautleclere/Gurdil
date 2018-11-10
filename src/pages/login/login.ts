import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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

      this.showLoader();

      //Check if already authenticated
      this.authService.checkAuthentication().then((res) => {
          console.log("Already authorized");
          this.loading.dismiss();
          this.navCtrl.setRoot(HomePage);
      }, (err) => {
          console.log("Not already authorized");
          this.loading.dismiss();
      });
  }


  login(){

      this.showLoader();

      let credentials = {
          telephone: this.telephone
      };

      this.authService.login(credentials).then((result) => {
          this.loading.dismiss();
          console.log(result);
          this.navCtrl.setRoot(HomePage);
      }, (err) => {
          this.loading.dismiss();
          console.log(err);
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
