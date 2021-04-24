import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MusicPlayer } from '../core/musicPlayer.services';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  @ViewChild(IonTabs) tabs: IonTabs;
  selected = "";
  progress = 10;
  track: any;

  constructor(private modalController: ModalController, private musicPlayer: MusicPlayer) { }


  async openModal() {
    this.track = this.musicPlayer.getTrack();
    console
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        // art: this.track.art,
        // title: this.track.title,
        // artist: this.track.artist

      }
    });
    modal.present();
  }

  ngOnInit() {

    this.track = this.musicPlayer.getTrack();
    console.log("current track is", this.track);

  }
  setSelectedTab() {
    this.selected = this.tabs.getSelected(); //returns name of tab
  }
}
