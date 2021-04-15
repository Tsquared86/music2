import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage implements OnInit {




  categories = [

    {
      title: 'Music Videos',
      videos: []

    },
    {
      title: 'Live Shows',
      videos: []
    },
    {
      title: 'Interviews',
      videos: []
    },
    {
      title: 'Toeknee Tee TV',
      videos: []
    }

  ];

  opts = {
    slidesPerView: 2.4,
    slidesOffsetBefore: 20,
    spaceBetween: 20,
    freeMode: true
  };

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  key = 'd46787d8e471fb4e3216fb4dd001bffe';
  url = 'https://www.googleapis.com/youtube/v3/playlistItems';
  apiKey = 'AIzaSyByVPIePX2IsVQ--BKTnz4FqPVtbk4-VNY'
  channel = 'UC6G9yjFn3LVJ7MfExL4YU2Q';
  interviews = 'PLnRlWDKv1d2XtHrPame56ity2dv6cVrIu';
  musicVids = 'PLnRlWDKv1d2XZw8zjSB1do0_9bxROAsY7';
  podcast = 'PLnRlWDKv1d2WoJmUChINQt4Cg2rFGi-Mc';
  live = 'PLnRlWDKv1d2WNH497flm9BJewQDzNQtUr';


  getInterview() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.interviews, } }).toPromise().then((data: any[]) => {
      //this.categories[2].videos = data;
      console.log('interviews', data);

    });
  }

  getPodcast() {  //promise to get data then its data which we assign as an array fille by the get request
    this.http.get(this.url, { params: { "part": "snippet", "key": this.apiKey, "channelId": this.channel, playlistId: this.podcast, } }).toPromise().then((data: any[]) => {


      //this.categories[3].videos = data;
      console.log(data);

    });

  }











  ngOnInit() {

    // this.dataService.getAlbums()

    this.getInterview();
    this.getPodcast();
  }

}



