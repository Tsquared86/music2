import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { MusicPlayer } from '../core/musicPlayer.services';

import { DataService } from './data.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [DataService, MusicPlayer]
})
export class CoreModule { }
