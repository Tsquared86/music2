import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  album = null;
  authKey = '3b4187adefc05df9c4e8a848c3d296e1';
  url = 'https://settrippn.com/tunes/server/json.server.php';
  discog: any;
  dataT = null;


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private dataService: DataService) { }

  ngOnInit() {



    this.discog = this.dataService.getDiscog();

    console.log('this album is', this.discog);
    //this.filterSingles();
    // this.http.get(this.url, { params: { "action": "albums", "auth": this.authKey, "include": "songs" } }).toPromise().then((data: Object[]) => {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    const decodedTitle = decodeURIComponent(title);
    console.log(title);


    this.album = this.discog.filter(d => {
      return d['name'] == decodedTitle
    })[0]

    console.log(this.album);


    // Helper function for image names
    //     let dasherize = (string) => {
    //   return string.replace(/[A-Z]/g, function (char, index) {
    //     return (index !== 0 ? '-' : '') + char.toLowerCase();
    //   });
    // };

    // filterSingles() {


    // }
  }
}