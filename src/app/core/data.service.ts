import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';



@Injectable()
export class DataService {

    public discog: any;

    url: string = 'https://settrippn.com/tunes/server/json.server.php?';
    authKey: string = '9c60dfd44af22975fe2d5ce0600f02be';




    constructor(private http: HttpClient) {


        this.loadDiscog()
    }



    loadDiscog() {
        this.http.get(this.url, { params: { "action": "albums", "auth": this.authKey, "include": "songs" } }).toPromise().then((data: Object[]) => {
            this.discog = data;
            // const title = data.paramMap.get('title');
            // const decodedTitle = decodeURIComponent(title);
            // this.album = data.filter(d => {
            //     return d['name'] == decodedTitle
            // })[0]
            console.log(data);
        });



    }



    public getDiscog() {


        return this.discog
    }
}