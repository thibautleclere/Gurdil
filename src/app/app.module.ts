import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { PalmaresPage } from "../pages/palmares/palmares";
import { FormsPage } from "../pages/form/form";
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { Gurdil } from '../services/gurdil';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { HomePageModule } from "../pages/home/home.module";
import {GurdilPage} from "../pages/gurdil/gurdil";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PalmaresPage,
    FormsPage,
    LoginPage,
    SignupPage,
    GurdilPage,
  ],
  imports: [
    HomePageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    PalmaresPage,
    FormsPage,
    LoginPage,
    SignupPage,
    GurdilPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Gurdil
  ]
})
export class AppModule {}
