import { Component } from '@angular/core'
import {ActionSheetController, AlertController, LoadingController, ToastController} from '@ionic/angular';
import {MediasService} from '../../services/medias.service';
import {Router} from '@angular/router';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  constructor(private alertCtrl: AlertController,
              private mediaService: MediasService,
              private router: Router,
              private toastCtrl: ToastController,
              private loadCtrl: LoadingController,
              private actionSheetCtrl: ActionSheetController) {}

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

  async onOpenRemoteAction() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Synchronisation serveur',
      buttons: [
        {
          text: 'Sauvegarder',
          icon: 'save',
          handler: () => {
            this.onSaveAllToRemote()
          }
        },
        {
          text: 'Récuperer les données',
          icon: 'cloud-download',
          handler: () => {
            this.onGetAllFromRemote()
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async onSaveAllToRemote() {
    const loader = await this.loadCtrl.create({
      message: 'Sauvegarde des données en cours...'
    })
    await loader.present()

    try {
      await this.mediaService.saveAllToRemote()
      loader.dismiss()
      const toast = await this.toastCtrl.create({
        message: 'Sauvegarde réussie',
        duration: 3000
      })
      return await toast.present()
    } catch (error) {
      loader.dismiss()
      const toast = await this.toastCtrl.create({
        message: error,
        duration: 3000
      })
      return await toast.present()
    }
  }

  async onGetAllFromRemote() {
    const loader = await this.loadCtrl.create({
      message: 'Récupération des données en cours...'
    })
    await loader.present()

    try {
      await this.mediaService.getAllFromRemote()
      loader.dismiss()
      const toast = await this.toastCtrl.create({
        message: 'Récupération réussie',
        duration: 3000
      })
      return await toast.present()
    } catch (error) {
      loader.dismiss()
      const toast = await this.toastCtrl.create({
        message: error,
        duration: 3000
      })
      return await toast.present()
    }
  }
}
