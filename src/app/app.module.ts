import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosPage } from './videos/videos.page';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { GlobalVariable } from './globals';
import { FcmService } from './services/fcm.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { MusicControls } from '@ionic-native/music-controls/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), CoreModule, AppRoutingModule, HttpClientModule],
  providers: [GlobalVariable, HttpClient, VideosPage, YoutubeVideoPlayer, SplashScreen, StatusBar, FcmService, Platform, MusicControls,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }