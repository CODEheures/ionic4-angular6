import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Cd} from '../../../../interfaces/medias/cd';
import {MediasService} from '../../../../services/medias.service';
import {ModalController} from '@ionic/angular';
import {CdDetailPage} from '../cd-detail/cd-detail.page';

@Component({
  selector: 'app-cd-list',
  templateUrl: './cd-list.page.html',
  styleUrls: ['./cd-list.page.scss'],
})
export class CdListPage implements OnInit, OnDestroy {

  public cds: Cd[] = [];
  public cdsSubscription: Subscription;

  constructor(private mediasService: MediasService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cdsSubscription = this.mediasService.cdsSubject.subscribe((cds) => {
      this.cds = cds;
    });
    this.mediasService.emitCds();
  }

  ngOnDestroy() {
    this.cdsSubscription.unsubscribe();
  }

  async onOpenDetail(i) {
    const modalDetail = await this.modalCtrl.create({
      component: CdDetailPage,
      componentProps: {id: i}
    });
    return await modalDetail.present();
  }
}
