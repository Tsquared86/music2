import { Injectable, ViewChild } from '@angular/core';
import { Howl } from 'howler';
import { IonRange } from '@ionic/angular';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { GlobalVariable } from '../../app/globals';

@Injectable()
export class MusicPlayer {

    public activeTrack: any = null;

    player: Howl = null;
    isPlaying = false;
    progress = 0;
    value = 0;
    @ViewChild('range') range: IonRange;

    constructor(public globals: GlobalVariable, private musicControls: MusicControls) {


    }

    public start(track: any) { //check if playing
        if (this.player) { //if playing stop curren track
            console.log("Playing stop")
            this.player.stop();
        }

        this.player = new Howl({
            src: [track.url],
            html5: true,
            onplay: () => {
                this.createMusicControl(track);
                this.isPlaying = true;
                this.activeTrack = track; //keeps up with current track
                this.updateProgress();
                console.log('active track', track);

            },

            onEnd: () => {

            },
        });
        this.player.play();
    }


    public createMusicControl(track) {
        this.musicControls.create({
            track: track.name,        // optional, default : ''
            artist: track.artist,                       // optional, default : ''
            cover: track.art,      // optional, default : nothing
            hasSkipForward: true,  // show skip forward button, optional, default: false
            hasSkipBackward: true,
            hasScrubbing: true, // enable scrubbing from control center and lockscreen progress bar, optional

            // Android only, optional
            // text displayed in the status bar when the notification (and the ticker) are updated, optional
            ticker: 'Now playing "Time is Running Out"',
            // All icons default to their built-in android equivalents
            playIcon: 'media_play',
            pauseIcon: 'media_pause',
            prevIcon: 'media_prev',
            nextIcon: 'media_next',
            closeIcon: 'media_close',
            notificationIcon: 'notification'
        });

        this.musicControls.subscribe().subscribe(action => {

            function events(action) {
                const message = JSON.parse(action).message;
                switch (message) {
                    case 'music-controls-next':
                        // Do something
                        break;
                    case 'music-controls-previous':
                        // Do something
                        break;
                    case 'music-controls-pause':
                        // Do something
                        break;
                    case 'music-controls-play':
                        // Do something
                        break;
                    case 'music-controls-destroy':
                        // Do something
                        break;

                    // External controls (iOS only)
                    case 'music-controls-toggle-play-pause':
                        // Do something
                        break;
                    case 'music-controls-seek-to':
                        const seekToInSeconds = JSON.parse(action).position;
                        this.musicControls.updateElapsed({
                            elapsed: seekToInSeconds,
                            isPlaying: true
                        });
                        // Do something
                        break;
                    case 'music-controls-skip-forward':
                        // Do something
                        break;
                    case 'music-controls-skip-backward':
                        // Do something
                        break;

                    // Headset events (Android only)
                    // All media button events are listed below
                    case 'music-controls-media-button':
                        // Do something
                        break;
                    case 'music-controls-headset-unplugged':
                        // Do something
                        break;
                    case 'music-controls-headset-plugged':
                        // Do something
                        break;
                    default:
                        break;
                }
            }
        });

        this.musicControls.listen(); // activates the observable above

        this.musicControls.updateIsPlaying(true);


    }

    public getTrack() {
        return this.activeTrack;
    }

    togglePlayer() { //when we push pause it either pauses it or plays
        if (this.globals.isPlaying) {
            this.player.pause();
        } else {
            this.player.play();
        }
        this.globals.isPlaying = !this.globals.isPlaying;
    }

    updateProgress() { //slider active with time
        let seek = this.player.seek();
        this.progress = (seek / this.player.duration()) * 100 || 0;
        this.globals.track_progress = this.progress;

        let that = this;
        this.player.on('end', function () {
            that.globals.isPlaying = false;
        });

        setTimeout(() => {  //update every __ms
            this.updateProgress();
        }, 100);
    }


}