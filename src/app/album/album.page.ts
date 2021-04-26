import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { MusicPlayer } from '../core/musicPlayer.services';

import { GlobalVariable } from '../../app/globals';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {
  album = null;
  discog: any;
  selectedTrack = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private dataService: DataService,
    private musicPlayer: MusicPlayer,
    public globals: GlobalVariable
  ) { }

  ngOnInit() {
    if (this.globals.track_info) {
      this.selectedTrack = this.globals.track_info.title;
    }

    this.discog = this.dataService.getDiscog();

    console.log('this album is', this.discog);
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    const decodedTitle = decodeURIComponent(title);
    console.log(title);

    this.album = this.discog.filter((d) => {
      return d['name'] == decodedTitle;
    })[0];

    console.log(this.album);

    // Helper function for image names
    //     let dasherize = (string) => {
    //   return string.replace(/[A-Z]/g, function (char, index) {
    //     return (index !== 0 ? '-' : '') + char.toLowerCase();
    //   });
    // };
  }

  playInTabs(track) {
    this.selectedTrack = track.title;
    this.globals.isPlaying = true;
    this.globals.track_info = track;
    this.musicPlayer.start(this.globals.track_info);
    this.musicPlayer.updateProgress();
  }
}