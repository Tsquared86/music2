import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import albums from '../../assets/mockdata/albums';


 

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
  @Input() album: string;
  data = null;
 
  constructor(private activatedRoute: ActivatedRoute) { }
 
  ngOnInit() {
    const title = this.activatedRoute.snapshot.paramMap.get('title');
    const decodedTitle = decodeURIComponent(title);
    this.data = albums[decodedTitle]; 
   
  }
 
    // Helper function for image names
    dasherize(string) {
      return string.replace(/[A-Z]/g, function(char, index) {
        return (index !== 0 ? '-' : '') + char.toLowerCase();
      });
    };
}