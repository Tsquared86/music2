import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../core/data.service';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { MusicPlayer } from '../core/musicPlayer.services';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  album = null;

  discog: any;
  // activeTrack: any[] = null;


  // player: Howl = null;
  // isPlaying = false;
  // progress = 0;
  // value = 0;
  // @ViewChild('range') range: IonRange;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private dataService: DataService, private musicPlayer: MusicPlayer) { }


  // start(track: any) { //check if playing
  //   if (this.player) { //if playing stop curren track
  //     this.player.stop();
  //   }
  //   this.player = new Howl({
  //     src: [track.url],
  //     html5: true,
  //     onplay: () => {
  //       console.log('onplay');
  //       this.isPlaying = true;
  //       this.activeTrack = track; //keeps up with current track
  //       this.updateProgress();
  //       console.log('current track', track);
  //     },

  //     onend: () => {
  //       console.log('onend');
  //     },
  //   });

  //   this.player.play();
  // }


  // togglePlayer() { //when we push pause it either pauses it or plays

  //   if (this.isPlaying) {
  //     this.player.pause();


  //   }
  //   else {
  //     this.player.play();
  //   }
  //   this.isPlaying = !this.isPlaying;
  // }

  // updateProgress() { //slider active with time
  //   let seek = this.player.seek();
  //   this.progress = (seek / this.player.duration()) * 100 || 0;
  //   setTimeout(() => {  //update every __ms
  //     this.updateProgress();
  //   }, 100);

  // }



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