import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SMS} from '@ionic-native/sms';

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
import { Sim } from '@ionic-native/sim';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    PalmaresPage,
    ParametersPage,
    LoginPage,
    SignupPage,
    GurdilPage,
  ],
  imports: [
    HomePageModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    ComponentsModule
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Gurdil,
    Beer,
    SMS,
    Sim,
  ]
})
export class AppModule {}
