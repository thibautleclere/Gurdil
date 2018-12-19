import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { IMessage } from '../../models/message';
import DataSnapshot = firebase.database.DataSnapshot;

@IonicPage()
@Component({
  selector: 'page-mur',
  templateUrl: 'mur.html',
})
export class MurPage implements OnInit {

  @ViewChild(Content)
  public content: Content;

  public messages: IMessage[];
  public start: number;
  public end: number;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public afStorage: AngularFireStorage,
      public afDatabase: AngularFireDatabase,
      public zone: NgZone) {
  }

  public ngOnInit(): void {
      this.messages = [];
      this.start = 0;
      this.end = 10;
      this.readChats();
      this.afDatabase.database.ref('/chats').on('child_added', (snap: DataSnapshot) => {
          this.zone.run(() => {
              this.toMessage(snap);
          });
      });
  }

  private readChats(): void {
      this.afDatabase.database.ref('/chats').startAt(this.start).endAt(this.end).once('value').then((snapShot: DataSnapshot) => {
          snapShot.forEach((value: DataSnapshot) => {
              this.toMessage(value);
          })
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
          const isPresent = this.messages.some((mess: IMessage) => {
              return mess.texte === message.texte && mess.phone === message.phone
          });
          if (!isPresent)
              this.messages.push(message);
      }
  }


  public atBottom(){
      return this.content.scrollTop === this.content.scrollHeight - this.content.contentHeight;
  }


  public ngAfterViewInit(): void {
     this.content.ionScrollEnd.subscribe((event: any) => {
        if (this.atBottom()) {
            this.start = this.start + (this.end - this.start);
            this.end = this.end + (this.end - this.start);
            this.readChats();
        }
     });
  }

}
