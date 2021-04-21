import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { MusicPlayer } from '../core/musicPlayer.services';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  album = null;

  discog: any;


  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private dataService: DataService, private musicPlayer: MusicPlayer) { }




  ngOnInit() {
    this.discog = this.dataService.getDiscog();

    console.log('this album is', this.discog);
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
  }
}