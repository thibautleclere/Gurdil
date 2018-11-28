import { EventEmitter, Injectable, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class FirebaseService {

    public constructor(
        private afdatabase: AngularFireDatabase,
        private afStorage: AngularFireStorage
    ){}
}