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
  track: any;

  constructor(private musicPlayer: MusicPlayer) { }

  ngOnit() {
    this.track = this.musicPlayer.getTrack();
    console.log(this.track)
  }

  setSelectedTab() {
    this.selected = this.tabs.getSelected(); //returns name of tab
  }
}
