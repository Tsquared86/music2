import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

//import albums from '../../assets/mockdata/albums';




/*https.get(url,function(response){

  response.on("data", function(declarations){
    var 
  })

} */


@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  album = null;
  authKey = '2dedef310d410071f9ec09a0f34a482e';
  url = 'https://settrippn.com/tunes/server/json.server.php';

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {


    this.http.get(this.url, { params: { "action": "albums", "auth": this.authKey, "include": "songs" } }).toPromise().then((data: Object[]) => {
      const title = this.activatedRoute.snapshot.paramMap.get('title');
      const decodedTitle = decodeURIComponent(title);
      this.album = data.filter(d => {
        return d['name'] == decodedTitle
      })[0]
      console.log(this.album);
    });


    // Helper function for image names
    // dasherize(string) {
    //   return string.replace(/[A-Z]/g, function (char, index) {
    //     return (index !== 0 ? '-' : '') + char.toLowerCase();
    //   });
  };

}