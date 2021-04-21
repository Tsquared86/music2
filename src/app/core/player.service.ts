import { Injectable, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';


@Injectable()
export class Player {

    discog: any;
    public activeTrack: any[] = null;


    player: Howl = null;
    isPlaying = false;
    progress = 0;
    value = 0;
    @ViewChild('range') range: IonRange;

    constructor() { }

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

    //   next() {
    //     let index = this.playlist.indexOf(this.activeTrack); //checks what song on the list b4 skipping
    //     if (index != this.playlist.length - 1) { //if last song go back
    //       this.start(this.playlist[index + 1]); //if mo songs go forward
    //     } else {
    //       this.start(this.playlist[0]);

    //     }

    //   }

    //   prev() {
    //     let index = this.playlist.indexOf(this.activeTrack);
    //     if (index > 0) {
    //       this.start(this.playlist[index - 1]);
    //     } else {
    //       this.start(this.playlist[this.playlist.length - 1]);

    //     }

    //   }

    seek() {
        // allow seek bar
        let newValue = +this.range.value;
        let duration = this.player.duration();
        this.player.seek(duration * (newValue / 100));
    }

    updateProgress() {
        let seek: any = this.player.seek();
        this.progress = (seek / this.player.duration()) * 100 || 0;
        setTimeout(() => {
            this.updateProgress();
        }, 500);


    }

}


