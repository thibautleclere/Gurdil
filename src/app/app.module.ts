import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SMS } from '@ionic-native/sms';
import { Camera } from '@ionic-native/camera';
import { EmailComposer } from '@ionic-native/email-composer';


// Import the AF2 Module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// AF2 Settings
export const firebaseConfig = {
    apiKey: "AIzaSyDFJXVMQXXNreBggFgQUmBEijqyaqffYsE",
    authDomain: "gurdil-219612.firebaseapp.com",
    databaseURL: "https://gurdil-219612.firebaseio.com",
    projectId: "gurdil-219612",
    storageBucket: "gurdil-219612.appspot.com",
    messagingSenderId: "244136901639"
};

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PalmaresPage } from "../pages/palmares/palmares";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { AuthProvider } from '../providers/auth/auth';
import { Gurdil } from '../services/gurdil';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HomePageModule } from '../pages/home/home.module';
import { GurdilPage } from '../pages/gurdil/gurdil';
import { ParametersPage } from '../pages/parameters/parameters';
import { ComponentsModule } from '../components/components.module';
import { Beer } from '../services/beer';
import { Game } from '../services/game';
import { GurdilAudio } from '../services/gurdil.audio';
import { GurdilPageModule } from '../pages/gurdil/gurdil.module';
import { LoginPageModule } from '../pages/login/login.module';
import { ParametersPageModule } from '../pages/parameters/parameters.module';
import { SignupPageModule } from '../pages/signup/signup.module';
import { MurPage } from '../pages/mur/mur';
import {MurPageModule} from "../pages/mur/mur.module";
import {AngularFirestore} from "@angular/fire/firestore";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PalmaresPage
  ],
  imports: [
    HomePageModule,
    GurdilPageModule,
    LoginPageModule,
    ParametersPageModule,
    SignupPageModule,
    MurPageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    ComponentsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PalmaresPage,
    ParametersPage,
    LoginPage,
    SignupPage,
    GurdilPage,
    MurPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Gurdil,
    Beer,
    SMS,
    Camera,
    Game,
    GurdilAudio,
    EmailComposer,
    AngularFirestore
  ]
})
export class AppModule {}
