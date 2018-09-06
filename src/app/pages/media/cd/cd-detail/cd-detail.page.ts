import { Component, OnInit } from '@angular/core';
import {MediasService} from '../../../../services/medias.service';
import {ActivatedRoute} from '@angular/router';
import {Cd} from '../../../../interfaces/medias/cd';

@Component({
  selector: 'app-cd-detail',
  templateUrl: './cd-detail.page.html',
  styleUrls: ['./cd-detail.page.scss'],
})
export class CdDetailPage implements OnInit {

  public cd: Cd;

  constructor(private mediasService: MediasService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cd = this.mediasService.getCdById(+id)
  }

  toggleLent(event) {
    this.cd.isLent = +event.detail.value === 1
  }

}
