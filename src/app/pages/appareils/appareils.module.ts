import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { AppareilsListPage } from './list/appareils-list';
import {AppareilDetailPage} from './detail/appareil-detail';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: AppareilsListPage
      },
      {
        path: ':id',
        component: AppareilDetailPage
      }
    ])
  ],
  declarations: [
    AppareilsListPage,
    AppareilDetailPage
  ]
})
export class AppareilsModule {}
