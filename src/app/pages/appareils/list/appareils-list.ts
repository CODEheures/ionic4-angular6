import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppareilsService} from '../../../services/appareils.service';
import {Subscription} from 'rxjs';
import {Appareil} from '../../../interfaces/appareil';
import {Router} from '@angular/router';

@Component({
    selector: 'page-appareils-list',
    templateUrl: 'appareils-list.html',
})

export class AppareilsListPage implements OnInit, OnDestroy {

  appareilsList: Appareil[]
  appareilsSubscription: Subscription

  constructor(private appareilsService: AppareilsService,
              private router: Router) { }

  ngOnInit() {
    this.appareilsSubscription = this.appareilsService.appareilsSubject.subscribe((appareils) => {
      this.appareilsList = appareils
    })
    this.appareilsService.publishAppareils()
  }

  ngOnDestroy() {
    this.appareilsSubscription.unsubscribe()
  }

  onGotoAppareil(id: number) {
    this.router.navigate(['/appareils', id])
  }
}
