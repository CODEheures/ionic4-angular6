import {Component, Input, OnInit} from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {Cd} from '../../../../interfaces/medias/cd';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-cd-detail',
  templateUrl: './cd-detail.page.html',
  styleUrls: ['./cd-detail.page.scss'],
})
export class CdDetailPage implements OnInit {

  @Input() id: number;

  public cd: Cd;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cd = this.mediasService.getCdById(this.id)
  }

  toggleLent(event) {
    this.cd.isLent = +event.detail.value === 1
  }

  onCloseModal() {
    this.modalCtrl.dismiss()
  }

}
