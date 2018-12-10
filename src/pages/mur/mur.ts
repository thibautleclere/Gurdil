import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import {AngularFireDatabase, AngularFireList, SnapshotAction, snapshotChanges} from '@angular/fire/database';
import { IMessage } from '../../models/message';
import {AngularFirestore, QuerySnapshot} from "@angular/fire/firestore";

@IonicPage()
@Component({
  selector: 'page-mur',
  templateUrl: 'mur.html',
})
export class MurPage {

  public messagesStored: AngularFireList<IMessage>;
  public messages: IMessage[] = [];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public afStorage: AngularFireStorage,
      public afDatabase: AngularFireDatabase,
      public afStore: AngularFirestore) {
    this.messagesStored = this.afDatabase.list('/chats');
  }

  public ionViewDidLoad(): void {

  }

  public ionViewDidEnter(): void {
    const subscription = this.messagesStored.valueChanges().subscribe((messages: IMessage[]) => {
      this.messages = messages;
      this.messages.forEach((message: IMessage) => {
        if (message.imageUrl) {
            this.afStorage.ref(message.imageUrl).getDownloadURL().subscribe((url) => {
                message.imageTrueUrl = url;
            });
        }
      })
    });
    subscription.unsubscribe();
    this.messagesStored.stateChanges().subscribe((snap: SnapshotAction<IMessage>) => {
      debugger;
      //this.messages.push(message);
    });
  }

}
