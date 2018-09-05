import {Component, OnInit} from '@angular/core';
import {Appareil} from '../../../interfaces/appareil'
import {ActivatedRoute} from '@angular/router';
import {AppareilsService} from '../../../services/appareils.service';

/**
 * Generated class for the AppareilDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-appareil-detail',
  templateUrl: 'appareil-detail.html',
  styleUrls: ['appareil-detail.scss']
})
export class AppareilDetailPage implements OnInit {

  public appareil: Appareil

  constructor(private activatedRoute: ActivatedRoute,
              private appareilsService: AppareilsService) {
  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.appareil = this.appareilsService.getAppareilById(+id)
  }
}
