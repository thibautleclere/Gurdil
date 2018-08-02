import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormsPage } from '../form/form';
import { HomePage } from '../home/home';
import { PalmaresPage } from '../palmares/palmares';
import { NainInterface } from '../../models/nain.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { Tabs } from "ionic-angular";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage implements AfterViewInit {

    @ViewChild('myTabs') tabRef: Tabs;

    tab1Root = HomePage;
    tab2Root = FormsPage;
    tab3Root = PalmaresPage;

    public nain: NainInterface;

    constructor(public storage: Storage, public authService: AuthProvider) {

    }

    public ngAfterViewInit() {
        this.authService.onLogin.subscribe((data: NainInterface) => {
            this.nain = data;
        });
        this.authService.onLogout.subscribe((data: boolean) => {
            this.tabRef.select(1);
        });
    }

    logout() {
        this.authService.logout();
    }
}