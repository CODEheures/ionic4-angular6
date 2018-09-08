import { Component } from '@angular/core'
import {AlertController} from '@ionic/angular';
import {MediasService} from '../../services/medias.service';
import {Router} from '@angular/router';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(private alertCtrl: AlertController,
              private mediaService: MediasService,
              private router: Router) {}

  async onToggleReset() {
    const alert = await this.alertCtrl.create({
      header: 'Êtes-vous certain(e) de vouloir réinitialiser?',
      subHeader: 'Cette action remettra tous les média à l\'état "disponible"',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Confirmer',
          handler: () => { this.resetAll()}
        }
      ]
    })
    await alert.present()
  }

  resetAll() {
    this.mediaService.lentOffAll()
    this.router.navigate(['/'])
  }
}
