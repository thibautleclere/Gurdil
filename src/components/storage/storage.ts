import { Component } from '@angular/core';
import { IonicStorageModule as Storage} from "@ionic/storage";
import {SessionInterface} from "./session.interface";

/**
 * Generated class for the StorageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'storage'
})
export class StorageComponent {

  storage: Storage;
  session: SessionInterface;

  public constructor() {}

  public initSession(login: string) {

    this.session.login = login;
    this.session.avatar = "";
    this.session.bestScore = 0;
    this.session.yearScore = 0;
    this.session.scores = [];
    if (sessionStorage) {
      sessionStorage.setItem("session", this.sessionEncode(this.session));
    } else {
      console.warn("Vous utiliser quoi comme telephone??!! un nokia 33 10");
    }
  }

  public getSession() {
    return sessionStorage.getItem("session");
  }

  private sessionEncode(json: SessionInterface) {

    var array = [];
    let keys = Object.keys(json);
    for (let key of keys) {
        array[key] = json[key];
    }
    return JSON.stringify(array);

  }

  private sessionDecode() {

  }

  public addScore(score: number) {



  }

}
