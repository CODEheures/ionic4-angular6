import {Component, Input, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Cd} from '../../../../interfaces/medias/cd';
import {AlertController, ModalController} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-cd-detail',
  templateUrl: './cd-detail.page.html',
  styleUrls: ['./cd-detail.page.scss'],
})
export class CdDetailPage implements OnInit {

  @Input() id: number;

  public cd: Cd;
  public cdFormGroup: FormGroup;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cd = this.mediasService.getCdById(this.id)

    this.cdFormGroup = this.formBuilder.group({
      lentBy: [this.cd.lentBy, Validators.required]
    })
  }

  toggleLent(event) {
    this.cd.isLent = +event.detail.value === 1
  }

  onCloseModal() {
    this.modalCtrl.dismiss()
  }

  async saveMe() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation',
      message: 'Enregistrer le nouvel état de ce CD?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Ok',
          handler: () => {
            this.mediasService.saveCd(this.id, this.cd)
            this.onCloseModal()
          }
        }
      ]
    })
    return await alert.present()
  }
}
