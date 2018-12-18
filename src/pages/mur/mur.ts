import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import {
    AngularFireDatabase,
    AngularFireList,
    ChildEvent,
    SnapshotAction,
    snapshotChanges
} from '@angular/fire/database';
import { IMessage } from '../../models/message';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/firestore";
import DataSnapshot = firebase.database.DataSnapshot;

@IonicPage()
@Component({
  selector: 'page-mur',
  templateUrl: 'mur.html',
})
export class MurPage {

  public messages: IMessage[] = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public afStorage: AngularFireStorage,
      public afDatabase: AngularFireDatabase,
      public afStore: AngularFirestore) {
  }

  public ionViewDidLoad(): void {

  }

  public ionViewDidEnter(): void {
  }

  public ionViewWillEnter(): void {
      this.afDatabase.database.ref('/chats').once('value').then((snapShot: DataSnapshot) => {
        snapShot.forEach((value: any) => {
            this.toMessage(snapShot);
        })
      });
      this.afDatabase.database.ref('/chats').on('child_added', (snap: DataSnapshot) => {
          debugger;
         this.toMessage(snap);
      });
  }

  private toMessage(snap: DataSnapshot): void {
      let data = snap.val();
      if (data) {
          let message = {
              date: data.date,
              phone: data.phone,
              name: data.name,
              texte: data.texte,
              imageTrueUrl: ''
          };
          if (data.imageUrl) {
              this.afStorage.ref(data.imageUrl).getDownloadURL().subscribe((url) => {
                  message.imageTrueUrl = url;
              });
          }
          const isPresent = this.messages.filter((mess: IMessage) => {
              return mess.texte === message.texte && mess.phone === message.phone
          });
          if (!isPresent.length)
              this.messages.push(message);
      }
  }

}
