import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MusicPlayer } from '../core/musicPlayer.services';



@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  @ViewChild(IonTabs) tabs: IonTabs;
  selected = "";
  progress = 10;

  constructor(private musicPlayer: MusicPlayer) { }

  //const source = require('../core/musicPlayer.services');
  current = this.musicPlayer.activeTrack;

  setSelectedTab() {
    this.selected = this.tabs.getSelected(); //returns name of tab
  }
}
