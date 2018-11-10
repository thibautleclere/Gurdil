import {EventEmitter, Injectable, Output} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NainInterface } from "../../models/nain.interface";

@Injectable()
export class AuthProvider {

    public token: any;

    @Output() public onLogin = new EventEmitter<NainInterface>();
    @Output() public onLogout = new EventEmitter<boolean>();
    @Output() public onLoadPlayers = new EventEmitter<boolean>();

    constructor(public http: Http, public storage: Storage) {

    }

    checkAuthentication(){

        return new Promise((resolve, reject) => {

            //Load token if exists
            this.storage.get('token').then((value) => {

                this.token = value;

                let headers = new Headers();
                headers.append('Authorization', this.token);

                this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
                    .subscribe(res => {
                        resolve(res);
                    }, (err) => {
                        reject(err);
                    });

            });

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

    public login(credentials) {

        return new Promise((resolve, reject) => {

            let headers = new Headers();
            headers.append('content-type','application/json');
            let options = new RequestOptions({ headers:headers,withCredentials: true});

            this.http.post('/get-user', credentials, options)
                .subscribe(res => {
                    const nain = res.json();
                    this.storage.set('nain', res.json());
                    this.onLogin.emit(nain);
                    resolve(res);
                }, (err) => {
                    this.storage.set('nain', 'lalala');
                    this.onLogin.emit(null);
                    //reject(err);
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