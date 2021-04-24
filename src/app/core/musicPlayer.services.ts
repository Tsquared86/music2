import { Injectable, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';


@Injectable()
export class MusicPlayer {




    public activeTrack: any = null;


    player: Howl = null;
    isPlaying = false;
    progress = 0;
    value = 0;
    @ViewChild('range') range: IonRange;

    public start(track: any) { //check if playing
        if (this.player) { //if playing stop curren track
            this.player.stop();
        }
        this.player = new Howl({
            src: [track.path],
            html5: true,
            onplay: () => {
                console.log('onplay');
                this.isPlaying = true;
                this.activeTrack = track; //keeps up with current track
                this.updateProgress();
                console.log('active track', track);
            },

            onend: () => {
                console.log('onend');
            },
        });

        this.player.play();
    }

    togglePlayer() { //when we push pause it either pauses it or plays

        if (this.isPlaying) {
            this.player.pause();


        }
        else {
            this.player.play();
        }
        this.isPlaying = !this.isPlaying;
    }

    updateProgress() { //slider active with time
        let seek = this.player.seek();
        this.progress = (seek / this.player.duration()) * 100 || 0;
        setTimeout(() => {  //update every __ms
            this.updateProgress();
        }, 100);

    }
    getTrack() {

        return this.activeTrack;
    }

}