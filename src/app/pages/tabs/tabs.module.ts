import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import {BooksListPageModule} from '../media/books/books-list/books-list.module';
import {BooksDetailPageModule} from '../media/books/books-detail/books-detail.module';
import {CdListPageModule} from '../media/cd/cd-list/cd-list.module';
import {CdDetailPageModule} from '../media/cd/cd-detail/cd-detail.module';
import {TabsPageRoutingModule} from './tabs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksListPageModule,
    BooksDetailPageModule,
    CdListPageModule,
    CdDetailPageModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
