import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';




@Injectable()
export class DataService {

    public discog: any;
    public sheet: any;

    url: string = 'https://settrippn.com/amp/server/json.server.php?';
    api: string = '3a123c8245b4357bf1129bdeb3c92f43';
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
        this.discog.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        })
        return this.discog
    }
}