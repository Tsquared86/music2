import { Component, } from '@angular/core';
import { DataService } from './core/data.service';
import { GlobalVariable } from '../app/globals';
import { FcmService } from './services/fcm.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { MusicControls } from '@ionic-native/music-controls/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private data: DataService, public globals: GlobalVariable, private fcmService: FcmService, private platform: Platform, private splashScreen: SplashScreen, private MusicControls: MusicControls,
    private statusBar: StatusBar) {

    this.initializeApp();

    // Get saved data for users
    if (localStorage.getItem("fav_albums") == '' || localStorage.getItem("fav_albums") == null || localStorage.getItem("fav_albums") == undefined) {
      this.globals.fav_albums = [];
    } else {
      this.globals.fav_albums = JSON.parse(localStorage.getItem("fav_albums"));
    }

    if (localStorage.getItem("fav_tracks") == '' || localStorage.getItem("fav_tracks") == null || localStorage.getItem("fav_tracks") == undefined) {
      this.globals.fav_tracks = [];
    } else {
      this.globals.fav_tracks = JSON.parse(localStorage.getItem("fav_tracks"));
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Trigger the push setup 
      this.fcmService.initPush();
    });
  }
}

