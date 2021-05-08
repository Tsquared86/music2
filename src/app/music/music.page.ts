import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../core/data.service';
import { MusicPlayer } from '../core/musicPlayer.services';
import { GlobalVariable } from '../../app/globals';
import { AlbumPage } from '../../app/album/album.page';

@Component({
  selector: 'app-music',
  templateUrl: 'music.page.html',
  styleUrls: ['music.page.scss']

})


export class MusicPage {

  categories = [

    {
      title: 'Unreleased Jams',
      albums: [],

    },
    {
      title: 'Singles',
      albums: [],
    },
    {
      title: 'Albums/EPs',
      albums: [],
    }

  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };


  discog: any;
  // authKey = '3b4187adefc05df9c4e8a848c3d296e1';
  url = 'https://settrippn.com/tunes/server/json.server.php';
  albums: any;
  songs: any;
  single: any[];
  secret: any[];

  segment_music: any = 'all';
  selectedTrack = "";
  constructor(private router: Router, private dataService: DataService, private route: ActivatedRoute, private http: HttpClient, public musicPlayer: MusicPlayer, public globals: GlobalVariable) {


  }

  ngOnInit() {
    //gt discog from data
    this.discog = this.dataService.getDiscog();

    this.albums = this.discog.filter((x) => x.songcount >= 2 && x.type != 'secret')


    // set albums to place
    this.categories[2].albums = this.albums;


    // //get secret
    // this.secret = this.discog.filter(f => {
    //   return f['type'] == 'remix'
    // })
    // console.log(this.secret);

    //get singles
    this.single = this.discog.filter((x) => x.songcount == 1 && x.type != 'secret')

    // set singles
    this.categories[1].albums = this.single;


    //get secret
    this.secret = this.discog.filter((x) => x.type == 'secret');

    this.categories[0].albums = this.secret;



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
  }

  segmentChanged_music(ev: any) {
    this.segment_music = ev.detail.value;
  }

  playInTabs(track) {
    this.selectedTrack = "";
    this.selectedTrack = track.title;
    this.globals.isPlaying = true;
    this.globals.track_info = track;
    this.musicPlayer.start(this.globals.track_info);
    this.musicPlayer.updateProgress();
  }


}
