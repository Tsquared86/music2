import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import recentlyPlayed from '../../assets/mockdata/recentlyPlayed.json';
import heavyRotation from '../../assets/mockdata/heavyRotation.json';
import jumpBackIn from '../../assets/mockdata/jumpBackIn.json';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from "@angular/router";


@Component({
selector: 'app-music',
templateUrl: 'music.page.html',
styleUrls: ['music.page.scss'] 

})


export class MusicPage {

  data = [
    {
      title: 'Discog' ,
      albums: []
    },
    {
    title: 'Unreleased Jams',
    albums: recentlyPlayed as any //json of catelog

  },
  {
    title: 'Singles',
    albums: heavyRotation as any
  },
  {
    title: 'Albums/EPs' ,
    albums: jumpBackIn as any
  } 
  
];

opts = {
  slidesPerView: 2.4,
  slidesOffsetBefore: 20,
  spaceBetween: 20,
  freeMode: true
};

constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {}



authKey = '2dedef310d410071f9ec09a0f34a482e';
url = 'https://settrippn.com/tunes/server/json.server.php';

runHttp(){  //promise to get data then its data which we assign as an array fille by the get request
  this.http.get(this.url, {params:{"action":"albums", "auth": this.authKey, "include": "songs"}}).toPromise().then((data: Object[]) => {
     
    console.log(data);
   
    for (let album in data)
      if (data.hasOwnProperty(album)){
        this.data[0].albums = data;
        console.log("hi");
      } 
  });
}


openAlbum(album) {
  const titleEscaped = (album.name);
  console.log('titleEscaped: ', titleEscaped);
  this.router.navigateByUrl(`/tabs/music/${titleEscaped}`);
}





dasherize(string) {
  return string.replace(/[A-Z]/g, function(char, index) {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
};
  ngOnInit() {

    this.runHttp();
  }
  


}
