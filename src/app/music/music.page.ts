import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import { DataService } from '../core/data.service';


@Component({
  selector: 'app-music',
  templateUrl: 'music.page.html',
  styleUrls: ['music.page.scss']

})


export class MusicPage {

  categories = [

    {
      title: 'Unreleased Jams',
      albums: []

    },
    {
      title: 'Singles',
      albums: []
    },
    {
      title: 'Albums/EPs',
      albums: []
    }

  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };


  discog: any;
  authKey = '3b4187adefc05df9c4e8a848c3d296e1';
  url = 'https://settrippn.com/tunes/server/json.server.php';
  albums: any;
  songs: any;
  single: any[];

  constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute, private http: HttpClient) {


  }

  ngOnInit() {
    //gt discog from data
    this.discog = this.dataService.getDiscog();
    console.log(this.discog);
    // set albums to place
    this.categories[2].albums = this.discog;



    this.single = this.discog.filter(d => {
      return d['songcount'] == 1
    })[0]
    console.log(this.single);

    // set singles
    this.categories[1].albums = this.single;
  }


  // getAlbums() {  //promise to get data then its data which we assign as an array fille by the get request
  //   this.http.get(this.url, { params: { "action": "albums", "auth": this.authKey, "include": "songs" } }).toPromise().then((data: Object[]) => {

  //     console.log(data);



  //   });

  // }




  getSingles() {

    // $.grep(this.discog, function (s) {
    //   return s.name <= 1

    // });
  }


  openAlbum(album) {
    console.log('album is', album);
    const titleEscaped = encodeURIComponent(album.name);
    console.log('this the title ', titleEscaped);
    this.router.navigateByUrl(`/tabs/music/${titleEscaped}`);
  }

  dasherize(string) {
    return string.replace(/[A-Z]/g, function (char, index) {
      return (index !== 0 ? '-' : '') + char.toLowerCase();
    });
  };


}
