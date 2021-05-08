import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';




@Injectable()
export class DataService {

    public discog: any;
    public sheet: any;

    url: string = 'https://settrippn.com/ampache/server/json.server.php?';
    api: string = 'ddfbc67192ef9fdf54c1d3e4f88eff1e';
    aKey: string;
    constructor(private http: HttpClient) {
        this.loadPWord()

    }

    public loadPWord() {
        this.http.get(this.url, { params: { "action": "handshake", "auth": this.api } }).toPromise().then((data: Object[]) => {
            this.sheet = data;
            this.aKey = this.sheet.auth;
            this.loadDiscog();

        })

    }

    loadDiscog() {

        this.http.get(this.url, { params: { "action": "albums", "auth": this.aKey, "include": "songs" } }).toPromise().then((data: Object[]) => {
            this.discog = data;
            console.log(data);
        });
    }

    public getDiscog() {
        return this.discog
    }
}