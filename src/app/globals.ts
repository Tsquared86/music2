import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable()
export class GlobalVariable {
  track_info: any;
  track_progress = 0;
  isPlaying: boolean = false;
  
  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController) {
    
  }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
}
