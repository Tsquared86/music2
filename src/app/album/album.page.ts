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


    this.album.isFavorite = false;
    this.album.tracks.forEach(element => {
      element.isFavorite = false;
    });
    console.log("Album loaded -> ", this.album);
    console.log("Album fav loaded -> ", this.globals.fav_albums);
    // Helper function for image names
    //     let dasherize = (string) => {
    //   return string.replace(/[A-Z]/g, function (char, index) {
    //     return (index !== 0 ? '-' : '') + char.toLowerCase();
    //   });
    // };

    let albumFound = false;
    if (this.globals.fav_albums.length > 0) {
      this.globals.fav_albums.forEach(element => {
        if (element.id == this.album.id) {
          albumFound = true;
          this.album.isFavorite = true;
        }
      });

      if (albumFound) {
        this.album.tracks.forEach(element => {
          element.isFavorite = true;
        });
      }
    }

    if (!albumFound) {
      this.album.tracks.forEach(element => {
        this.globals.fav_tracks.forEach(trk => {
          if (element.id == trk.id) {
            element.isFavorite = true;
          }
        });
      });
    }
  }






  addToFav() {
    let found = false;
    if (this.globals.fav_albums.length > 0) {
      // to avoid re-entry of same album
      this.globals.fav_albums.forEach(element => {
        if (element.id == this.album.id) {
          found = true;
        }
      });

      if (!found) {
        this.album.isFavorite = true;
        this.globals.fav_albums.push(this.album);

        this.album.tracks.forEach(element => {
          element.isFavorite = true;
          this.globals.fav_tracks.push(element);
        });
      }
    } else {
      // Very first entry
      this.album.isFavorite = true;
      this.globals.fav_albums.push(this.album);

      this.album.tracks.forEach(element => {
        element.isFavorite = true;
        this.globals.fav_tracks.push(element);
      });
    }

    // To remove duplicate
    this.globals.fav_tracks = this.globals.fav_tracks.reduce((unique, o) => {
      if (!unique.some(obj => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // Saving locally
    localStorage.setItem("fav_albums", JSON.stringify(this.globals.fav_albums));
    localStorage.setItem("fav_tracks", JSON.stringify(this.globals.fav_tracks));
  }

  addTrackToFav(track) {
    if (this.globals.fav_tracks.length == 0) {
      track.isFavorite = true;
      this.globals.fav_tracks.push(track);
    } else {
      let found = false;
      this.globals.fav_tracks.forEach(element => {
        if (element.id == track.id) {
          found = true;
        }
      });

      if (!found) {
        track.isFavorite = true;
        this.globals.fav_tracks.push(track);
      }
    }

    // To remove duplicate
    this.globals.fav_tracks = this.globals.fav_tracks.reduce((unique, o) => {
      if (!unique.some(obj => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // Saving locally
    localStorage.setItem("fav_tracks", JSON.stringify(this.globals.fav_tracks))
  }

  playInTabs(track) {
    this.selectedTrack = track.title;
    this.globals.isPlaying = true;
    this.globals.track_info = track;
    this.musicPlayer.start(this.globals.track_info);
    this.musicPlayer.updateProgress();
  }
}
