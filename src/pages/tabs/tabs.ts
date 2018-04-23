import { Component } from '@angular/core';

import { FormsPage } from '../form/form';
import { HomePage } from '../home/home';
import {PalmaresPage} from "../palmares/palmares";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {

    tab1Root = HomePage;
    tab2Root = FormsPage;
    tab3Root = PalmaresPage

    constructor() {

    }
}