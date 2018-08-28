import {Component, ViewChild, AfterViewInit, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { PalmaresPage } from '../palmares/palmares';
import { NainInterface } from '../../models/nain.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController, Tabs } from "ionic-angular";
import { ParametersPage } from "../parameters/parameters";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit, AfterViewInit {

    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root = HomePage;
    tab2Root = ParametersPage;
    tab3Root = PalmaresPage;

    public nain: NainInterface;

    constructor(public storage: Storage, public authService: AuthProvider, public navCtrl: NavController) {
    }

    ngOnInit() {
        this.storage.get('nain').then((nain) => this.nain = nain);
    }

    public ngAfterViewInit() {
        this.storage.get('nain').then((nain) => this.nain = nain);
        this.authService.onLogin.subscribe((data: NainInterface) => {
            this.nain = data;
        });
        this.authService.onLogout.subscribe((data: boolean) => {
            this.navCtrl.setRoot(this.navCtrl.getActive().component);
        });
    }

    logout() {
        this.authService.logout();
    }
}