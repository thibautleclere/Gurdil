import {EventEmitter, Injectable, Output} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NainInterface } from '../../models/nain.interface';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable()
export class AuthProvider {

    public dwarves: AngularFireList<NainInterface>;

    @Output() public onLogin = new EventEmitter<NainInterface>();
    @Output() public onLogout = new EventEmitter<boolean>();
    @Output() public onLoadPlayers = new EventEmitter<boolean>();

    constructor(
        public http: Http,
        public storage: Storage,
        public afDatabase: AngularFireDatabase) {
        this.dwarves = this.afDatabase.list('/groupes/players');
    }

    checkAuthentication(){

        return new Promise((resolve, reject) => {

            //Load token if exists
            /*this.storage.get('token').then((value) => {

                this.token = value;

                let headers = new Headers();
                headers.append('Authorization', this.token);

                this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });

            });*/

        });

    }

    public createAccount(details){

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');

            this.storage.set('token', details);
            resolve(details);

            /*this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
                .subscribe(res => {

                    let data = res.json();
                    this.token = data.token;
                    this.storage.set('token', data.token);
                    resolve(data);

                }, (err) => {
                    reject(err);
                });*/

        });

    }

    public login(telephone) {

        return new Promise((resolve, reject) => {

            this.dwarves.valueChanges().subscribe((nains: NainInterface[]) => {
                nains.forEach((nain: NainInterface) => {
                    if (nain.phone === telephone) {
                        this.storage.set('nain', JSON.stringify(nain));
                        this.onLogin.emit(nain);
                        resolve();
                    }
                });
            }, (err) => {
                console.warn(err);
                reject(err);
            });

        });

    }

    public logout() {
        this.storage.remove('nain').then(() => {
            console.warn('Disconnection');
            this.onLogout.emit(true);
        });
    }

}