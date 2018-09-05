import { Component } from '@angular/core'
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(private alertCtrl: AlertController){}

  async onToggleLights() {
    const alert = await this.alertCtrl.create({
      header: 'Êtes-vous certain(e) de vouloir continuer?',
      subHeader: 'Cette action allumera ou eteindra toutes les lumières de la maison',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => { console.log('confirmé!')}
        }
      ]
    })
    await alert.present()
  }
}