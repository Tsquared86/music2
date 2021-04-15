import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbumPageRoutingModule } from './album-routing.module';
import { MusicPlayer } from '../core/musicPlayer.services';

import { AlbumPage } from './album.page';
import { SharedDirectivesModule } from '../directives/shared-directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbumPageRoutingModule,
    SharedDirectivesModule,
    MusicPlayer
  ],
  declarations: [AlbumPage]
})
export class AlbumPageModule { }
