import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {
  categories = [
    {
      title: 'Music Videos',
      videos: [{ items: [] }]

    },
    {
      title: 'Live Shows',
      videos: [{ items: [] }]
    },
    {
      title: 'Interviews',
      videos: [{ items: [] }]
    },
    {
      title: 'Toeknee Tee TV',
      videos: [{ items: [] }]
    }

  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private youtube: YoutubeVideoPlayer, private plt: Platform) { }

  key = 'd46787d8e471fb4e3216fb4dd001bffe';
  url = 'https://www.googleapis.com/youtube/v3/playlistItems';
  apiKey = 'AIzaSyByVPIePX2IsVQ--BKTnz4FqPVtbk4-VNY'
  channel = 'UC6G9yjFn3LVJ7MfExL4YU2Q';
  interviews = 'PLnRlWDKv1d2XtHrPame56ity2dv6cVrIu';
  musicVids = 'PLnRlWDKv1d2XZw8zjSB1do0_9bxROAsY7';
  podcast = 'PLnRlWDKv1d2WoJmUChINQt4Cg2rFGi-Mc';
  live = 'PLnRlWDKv1d2WNH497flm9BJewQDzNQtUr';



  getInterview() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.interviews, 'maxResults': '50', } }).toPromise().then((data: any) => {

      data.items.forEach((element) => {
        let title = '';
        title = element.snippet.title.replace('Toeknee Tee', '');
        element.snippet.title = title;
      });
      this.categories[2].videos = data;
    });
  }

  getClips() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.musicVids, 'maxResults': '50', } }).toPromise().then((data: any) => {
      data.items.forEach((element) => {
        let title = '';
        title = element.snippet.title.replace('Toeknee Tee -', '');
        element.snippet.title = title;
      });
      this.categories[0].videos = data;
    });



  }

  getLive() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.live, 'maxResults': '50', } }).toPromise().then((data: any) => {
      data.items.forEach((element) => {
        let title = '';
        title = element.snippet.title.replace('Toeknee Tee Live @', '');
        element.snippet.title = title;
      });
      this.categories[1].videos = data;
    });



  }

  getPodcast() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.podcast, 'maxResults': '50', } }).toPromise().then((data: any) => {
      data.items.forEach((element) => {
        let title = '';
        title = element.snippet.title.replace('Toeknee Tee', '');
        element.snippet.title = title;
      });
      this.categories[3].videos = data;
    });
  }

  openVideo(video) {
    if (this.plt.is('cordova')) {
      this.youtube.openVideo(video.snippet.resourceId.videoId);
    } else {
      window.open(`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`);
    }
  }








  ngOnInit() {


    this.getClips();
    this.getInterview();
    this.getPodcast();
    this.getLive();
  }

}
